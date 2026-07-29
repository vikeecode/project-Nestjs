import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';
import { UnauthorizedException } from '@nestjs/common';
@Injectable()
export class AuthService {
  // loginUser(LoginUserDto: LoginUserDto) {
  //   throw new Error('Method not implemented.');
  // }
    constructor(private readonly userService: UserService,
         private readonly jwtService: JwtService
    ) {}
  async registerUser(registerDto: RegisterUserDto){
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
       const user = await this.userService.createUser({...registerDto, password: hashedPassword});
        const payload = { sub: user._id, email: user.email}
       const token = await this.jwtService.signAsync(payload);
       console.log('JWT Token generated:', token);
       
       console.log('User created:', user);
       return {
        message: 'User registered successfully',
        token
       };
    }

     async loginUser(loginDto: LoginUserDto){
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
          const isPasswordMatch = await bcrypt.compare(loginDto.password, user.password);
          if (!isPasswordMatch) {
            return new UnauthorizedException('Invalid password');
          }
          // return a jwt token 

          const payload = {sub: user._id, email: user.email}
          const token = await this.jwtService.signAsync(payload);
          const {password, ...userData } = user.toObject();
          console.log('JWT Token generated:', userData);

          return {
            message: 'User logged in successfully',
            access_token: token,
            userData
          };
        }
}
