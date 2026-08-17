import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { RevokedToken, RevokedTokenDocument } from './schemas/logut.schema';
import { error } from 'console';
import { MailSenderServicesService } from './mail-sender-services.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(RevokedToken.name, 'LMS')
    private readonly revokedTokenModel: Model<RevokedTokenDocument>,
      private readonly mailSenderService: MailSenderServicesService,
  ) {}
  async registerUser(registerDto: RegisterUserDto) {
    console.log('Registering user:', registerDto);
    const saltRounds = 10;
    if (!registerDto.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);
    registerDto.password = hashedPassword;

    //logic
    /**
     * - done -check email already exixt or not
     * - done- hash password
     * - done - save user to database
     * - generate jwt token
     * - return jwt token
     *  - send token in response
     */
    const user = await this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });
    const payload = { sub: user._id, email: user.email, type: 'email-verification', role: user.role };
    const verificationToken = await this.jwtService.signAsync(payload);

     user.emailVerificationToken = verificationToken;

  user.emailVerificationExpires = new Date(
    Date.now() + 15 * 60 * 1000,
  );

  await user.save();

    console.log('JWT Token generated:', verificationToken);

    console.log('User created:', user);
    if (user.email) {
      await this.mailSenderService.sendVerificationEmail(user.email, verificationToken);
    }
   return {
  message: 'Registration successful. Please verify your email.',
  emailVerified: user.emailVerified,
};
  }

  async loginUser(loginDto: LoginUserDto) {
    //logic
    /**
     * - check user exist or not
     * - check password is correct or not
     * - generate jwt token
     * - return jwt token
     * - send token in response
     */
    const user = await this.userService.findUserByEmail(loginDto);
    console.log('User found:', user);
    if (!user) {
      return new UnauthorizedException('User not found');
    }
    if (!loginDto.password || !user.password) {
      return new UnauthorizedException('Invalid password');
    }
    const isPasswordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      return new UnauthorizedException('Invalid password');
    }
    if (!user.emailVerified) {
  throw new UnauthorizedException(
    'Please verify your email before login',
  );
}
    // return a jwt token

    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    if (!token) {
      return new UnauthorizedException('Token generation failed');
    }

    const { password, ...userData } = user.toObject();
    console.log('JWT Token generated:', userData);
    console.log('User logged in:', userData);
    return {
      message: 'User logged in successfully',
      access_token: token,
      userData,
    };
  }

  //verify email service
  async VerifyEmail(token: string) {
    try{
      if(!token) {
      throw new UnauthorizedException('Token is required');
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    if (payload.type !== 'email-verification') {
      throw new UnauthorizedException('Invalid token type');
    }

    const user = await this.userService.getUserId(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (user.emailVerificationToken !== token) {
      throw new UnauthorizedException('Invalid token');
    }

    if (
      !user.emailVerificationExpires ||
      user.emailVerificationExpires < new Date()
    ) {
      throw new UnauthorizedException('Token has expired');
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return {
      message: 'Email verified successfully',
    };
    }catch(err:unknown){
      console.error('Error verifying email:', err);
      throw(err);
    }
    }
  

  //logout user service

  async logoutUser(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or invalid',
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // decode to get expiry so you can auto-cleanup later
      const decoded = this.jwtService.decode(token) as { exp?: number };
      const expiresAt = decoded?.exp ? new Date(decoded.exp * 1000) : undefined;

      await this.revokedTokenModel.create({
        token,
        expiresAt,
      });
    } catch (err: unknown) {
      // avoid failing logout just because it was already revoked
      const error = err as { code?: number };
      if (error.code !== 11000) {
        throw err;
      }
    }

    return {
      message: 'User logged out successfully',
    };
  }

  //froget password service
  async FrogetPassword(email: string) {
    const user = await this.userService.findUserByEmail({ email});
      if(!user) {
        throw new UnauthorizedException('User not found');
      }
      const  resetToken = await this.jwtService.signAsync({ sub: user._id, email: user.email, type: 'forget-password' }, { expiresIn: '15m' });
      if(! resetToken ){
        throw new UnauthorizedException('Token generation failed');
      }
      user.forgetPasswordToken = resetToken;
      user.forgetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
      const updatedUserPassword = await user.save();
      if(!updatedUserPassword){
        throw new UnauthorizedException('User not updated');
      }
      if (!user.email) {
        throw new UnauthorizedException('User email not found');
      }
      const emailSent = await this.mailSenderService.sendPasswordResetEmail(user.email, resetToken);
      if(!emailSent){
        throw new UnauthorizedException('Email not sent');
      }
      return {
        message: 'Email sent successfully',
      };
  }

  //reset Password service 
  async ResetPassword(token: string, newPassword:string) {
    if (!token) {
    throw new UnauthorizedException('Reset token is required');
  }
  let payload;

  try {
    payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  } catch(err){
      throw new UnauthorizedException('Invalid token');
  }

  if (payload.type !== 'forget-password') {
    throw new UnauthorizedException(
      'Invalid reset token',
    );
  }

  const user = await this.userService.getUserId(payload.sub);
  if(!user) {
    throw new UnauthorizedException('User not found');
  }
  if(user.forgetPasswordToken !== token ){
    throw new UnauthorizedException('Invalid token');
  }

  if(!user.forgetPasswordExpires || user.forgetPasswordExpires < new Date()){
    throw new UnauthorizedException('Token has expired');
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  user.password = hashedPassword;
  user.forgetPasswordToken = undefined;
  user.forgetPasswordExpires = undefined;
  const updatedUserPassword = await user.save();
  if(!updatedUserPassword){
    throw new UnauthorizedException('User not updated');
  }
  return {
    message: 'Password reset successfully',
  };
  }
}
