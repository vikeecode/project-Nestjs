import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { BlogModule } from './blog/blog.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';



  @Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    //late lamiting 
     ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 5,
        },
      ],
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
    CourseModule,
    BlogModule,

  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }

  ],
})
export class AppModule {}
