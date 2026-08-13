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
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(RevokedToken.name, 'LMS')
    private readonly revokedTokenModel: Model<RevokedTokenDocument>,
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
    return {
      message: 'User registered successfully',
      token: verificationToken,
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
}
