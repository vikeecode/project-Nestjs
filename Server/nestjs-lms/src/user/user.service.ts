import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from "../user/schemas/user.schema";
import { LoginUserDto } from 'src/auth/dto/loginUser.dto';
@Injectable()
export class UserService {
     constructor(@InjectModel(User.name, 'LMS') private userModel: Model<User>) {}
     //register user 
   async createUser(registerUserDto: RegisterUserDto){

        try{
            const user =  await this.userModel.create({
            fname: registerUserDto.fname,
            lname: registerUserDto.lname,
            email: registerUserDto.email,
            password: registerUserDto.password,
        })
        // return { message: 'User created successfully'};
          return user;
        }catch(err: unknown){
            console.error('Error creating user:', err);
            const e = err as { code?: number; keyPattern?: { email?: number } };
            const DUPLICATE_KEY_CODE = 11000;
            if (e.code === DUPLICATE_KEY_CODE && e.keyPattern?.email) {
                throw new ConflictException('User with this email already exists');
            }
            throw(err);
        }
      
    }

    //login user 
    async findUserByEmail(loginUserDto: LoginUserDto){

        try{
            const user = await this.userModel.findOne({
                email: loginUserDto.email
            })
            return user;
        }catch(err:unknown){
            console.error('Error finding user:', err);
            throw(err);
        }
       
    }

    //get user by id
    async getUserId(id: string){
        try{
            const user = await this.userModel.findById(id);
            return user;
        }
        catch(err:unknown){
            console.error('Error finding user by ID:', err);
            throw(err);
        }
      
    }
}
