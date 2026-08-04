import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
   
    constructor( private readonly  authService: AuthService, private readonly userService: UserService) {}
    //register user
    @Post('register')
     async register(@Body() registerUserDto:RegisterUserDto ){
      const token = await this.authService.registerUser(registerUserDto);
        return token;   
    }

    //login user 

    @Post('login')

    async loginUser(@Body() LoginUserDto: LoginUserDto) {
      const user = await this.authService.loginUser(LoginUserDto);
      return user;
    }
    @UseGuards(AuthGuard)
    @Get('Profile')

    async getProfile(@Request() req){
      const userId = req.user.sub;
      const user = await this.userService.getUserId(userId);
      console.log('User profile:', user);
      return {
        message: 'User profile retrieved successfully',
        id: user?._id,
        fname: user?.fname,
        lname: user?.lname,
        email: user?.email,
        role: user?.role
      };
    }

}
