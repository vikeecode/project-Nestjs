import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


  @Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGODB_URL!, {
      connectionName: 'LMS',
      dbName: 'LMS',

      connectionFactory: (connection) => {
        console.log('✅ MongoDB Connected Successfully!');
        console.log(`Connection Name: LMS`);
        console.log(`Database Name: ${connection.name}`);

        return connection;
      },
    }),
    AuthModule,
    UserModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
