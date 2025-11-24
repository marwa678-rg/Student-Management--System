import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  code: string;

  @IsInt()
  @IsOptional()
  teacherId?: number;
}
