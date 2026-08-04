import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course, CourseSchema } from './schemas/course.schemas';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
