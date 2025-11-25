import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    //build
    const student = this.studentRepo.create(createStudentDto);
    // Create Profile

    return this.studentRepo.save(student);
  }

  findAll() {
    return this.studentRepo.find({
      relations: ['profile', 'enrollments'],
    });
  }

  async findOne(id: number) {
    const student = this.studentRepo.findOne({
      where: { id },
      relations: ['profile', 'enrollments.course'],
    });

    if (!student) throw new NotFoundException('Student Not Found!');
    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepo.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.studentRepo.softDelete(id);
  }

  restore(id: number) {
   
    return this.studentRepo.restore(id);
  }
}
