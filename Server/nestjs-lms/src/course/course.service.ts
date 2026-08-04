import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/course/schemas/course.schemas';


@Injectable()
export class CourseService {
 constructor(@InjectModel(Course.name, 'LMS') private courseModel: Model<Course>) {}
 async create(createCourseDto: CreateCourseDto) {
    try {
      const course =  await this.courseModel.create({
        name: createCourseDto.name,
        description: createCourseDto.description,
        image: createCourseDto.image,
        level: createCourseDto.level,
        price: createCourseDto.price,
      });
      console.log('Course created successfully:', course);
      return course;
     }
    catch (error) {
      throw new InternalServerErrorException('Error creating course');
    }
  }

  async findAll() {
    try {
      const findAll = await this.courseModel.find();
    console.log('Courses retrieved successfully:', findAll);
    return findAll;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving courses');
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
