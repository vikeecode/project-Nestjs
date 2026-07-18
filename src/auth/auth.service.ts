import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
  async registerUser(registerDto: RegisterUserDto){
        console.log('Registering user:', registerDto);
    const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);
        registerDto.password = hashedPassword;
      
        //logic
        /**
         * - check email already exixt or not
         * - hash password
         * - save user to database
         * - generate jwt token
         * - return jwt token
         *  - send token in response
         */
       const result = this.userService.createUser({...registerDto, password: hashedPassword});
       return result;
        // return {message: 'User registered successfully'};
    }
}
