import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
   
    constructor( private readonly  authService: AuthService) {}
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
}
