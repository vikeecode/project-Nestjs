import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RevokedToken, RevokedTokenSchema } from './schemas/logut.schema';
import { MailSenderServicesService } from './mail-sender-services.service';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot(),
     JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1000s' },
    }),
     MongooseModule.forFeature([
      { name: RevokedToken.name, schema: RevokedTokenSchema  },
    ],
    "LMS"),
  ],
  
  controllers: [AuthController],
  providers: [AuthService, MailSenderServicesService],

})
export class AuthModule {}
