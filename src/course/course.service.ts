import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    @InjectRepository(Course) private courseRepo: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const { code, title, teacherId } = createCourseDto;


    // Validate Code 
    const courseExist = await this.courseRepo.findOne({ where: { code } });
    if (courseExist) throw new NotFoundException('Course Already Exist!');

    const course = this.courseRepo.create({ code, title });

    if (teacherId) {
      const teacher = await this.teacherRepo.findOne({
        where: { id: teacherId },
      });

      if (!teacher) throw new NotFoundException('Teacher Not Found!');
      course.teacher = teacher;
    }
    return this.courseRepo.save(course);
  }

  findAll() {
    return this.courseRepo.find({ relations: ['teacher', 'enrollments'] });
  }

  async findByCode(code: string) {
    const course = await this.courseRepo.findOne({
      where: { code },
      relations: ['teacher', 'enrollments'],
    });

    if (!course) throw new NotFoundException('Course Not Found!');

    return course;
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOne({
      where: { id },
      relations: ['teacher', 'enrollments'],
    });

    if (!course) throw new NotFoundException('Course Not Found!');

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);

    if (updateCourseDto.teacherId) {
      const teacher = await this.teacherRepo.findOne({
        where: { id: updateCourseDto.teacherId },
      });

      if (!teacher) throw new NotFoundException('Teacher Not Found!');
      course.teacher = teacher;
    }

    course.title = updateCourseDto.title || course.title;
    course.code = updateCourseDto.code || course.code;

    return this.courseRepo.save(course);
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
