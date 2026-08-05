import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/course/schemas/course.schemas';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name, 'LMS') private courseModel: Model<Course>,
  ) {}
  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseModel.create({
        name: createCourseDto.name,
        description: createCourseDto.description,
        image: createCourseDto.image,
        level: createCourseDto.level,
        price: createCourseDto.price,
      });
      console.log('Course created successfully:', course);
      return {
        message: 'Course created successfully',
        course: course,
      };
    } catch (error) {
      console.error(error);
      throw error;
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

  async findOne(id: string) {
    try {
      const findOne = await this.courseModel.findById(id);
      console.log('Course retrieved successfully:', findOne);
      findOne ? findOne : new InternalServerErrorException('Course not found');

      return findOne;
    } catch (error) {
      throw new InternalServerErrorException('Error finding course');
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      const updateCourse = await this.courseModel.findByIdAndUpdate(
        id,
        updateCourseDto,
        { new: true },
      );
      if (!updateCourse) {
        throw new InternalServerErrorException('Course not found');
      }
      console.log('Course updated successfully:', updateCourse);
      return {
        message: 'Course updated successfully',
        course: updateCourse,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error updating course');
    }
  }

  async remove(id: string) {
    try {
      const removeCourse = await this.courseModel.findByIdAndDelete(id);
      if (!removeCourse) {
        throw new InternalServerErrorException('Course not found');
      }
      console.log('Course deleted successfully:', removeCourse);
      return {
        message: 'Course deleted successfully',
        course: removeCourse,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting course');
    }
  }
}
