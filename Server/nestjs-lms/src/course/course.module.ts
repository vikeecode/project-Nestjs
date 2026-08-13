import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './schemas/course.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { RevokedToken, RevokedTokenSchema } from 'src/auth/schemas/logut.schema';

@Module({
   imports: [
    MongooseModule.forFeature(
      [
        {
          name: Course.name,
          schema: CourseSchema,
        },
      ],
      "LMS",
    ),
     MongooseModule.forFeature([
          { name: RevokedToken.name, schema: RevokedTokenSchema  },
        ],
        "LMS"),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
