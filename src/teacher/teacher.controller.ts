import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Get(':id/courses')
  findCourses(@Param('id') id: string) {
    // Graph QL
    return this.teacherService.findOne(+id).then((teacher) => teacher.courses);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }

  @Patch(':teacherId/courses/:courseId')
  assignCourse(
    @Param('teacherId') teacherId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.teacherService.assignCourse(+teacherId, +courseId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }

  @Delete(':teacherId/courses/:courseId')
  removeCourseFromTeacher(
    @Param('teacherId') teacherId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.teacherService.removeCourseFromTeacher(+teacherId, +courseId);
  }
}
