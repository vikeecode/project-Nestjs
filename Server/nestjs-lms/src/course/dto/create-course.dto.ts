import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsString()
  @IsOptional()
  image?: string;

  // @IsString()
  // @IsOptional()
  // video?:string;

  // @IsString()
  // @IsOptional()
  // pdf?:string;

  @IsString()
  @IsOptional()
  level?: string;

  @IsNotEmpty()
  @IsString()
  price?: string;
}
