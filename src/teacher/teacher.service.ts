import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
    @InjectRepository(Course) private courseRepo: Repository<Course>,
  ) {}

  create(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teacherRepo.create(createTeacherDto);
    return this.teacherRepo.save(teacher);
  }

  findAll() {
    return this.teacherRepo.find({ relations: ['courses'] });
  }

  async findOne(id: number) {
    const teacher = await this.teacherRepo.findOne({
      where: { id },
      relations: ['courses'],
    });
    if (!teacher) throw new NotFoundException('Teacher Not Found!');
    return teacher;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.findOne(id);
    Object.assign(teacher, updateTeacherDto);

    return this.teacherRepo.save(teacher);
  }

  restore(id:number){
    return this.teacherRepo.restore(id);
  }

  remove(id: number) {
    return this.teacherRepo.softDelete(id);
  }

  async removeCourseFromTeacher(teacherId: number, courseId: number) {
    const teacher = await this.findOne(teacherId);

    teacher.courses = teacher.courses.filter((course) => course.id != courseId);

    return this.teacherRepo.save(teacher);
  }

  async assignCourse(teacherId: number, courseId: number) {
    const teacher = await this.findOne(teacherId);

    // Course inside DB
    const course = await this.courseRepo.findOne({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course Not Found!');
//check in teacher courses
    const existingCourse = teacher.courses.find(
      (course) => course.id == courseId,
    );

    if (existingCourse) throw new BadRequestException('Course Already Exist!');
    teacher.courses.push(course);

    return this.teacherRepo.save(teacher);
  }
}
