import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment, EnrollmentStatus } from './entities/enrollment.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Course } from 'src/course/entities/course.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepo: Repository<Enrollment>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,

    @InjectRepository(Course)
    private courseRepo: Repository<Course>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const { studentId, courseId, status } = createEnrollmentDto;

    const student = await this.studentRepo.findOne({
      where: { id: studentId },
    });

    if (!student) throw new NotFoundException('Student Not Found!');

    const course = await this.courseRepo.findOne({
      where: { id: courseId },
    });

    if (!course) throw new NotFoundException('Course Not Found!');

    // Prevent Duplicate
    const exstingEnrollment = await this.enrollmentRepo.findOne({
      where: { student, course },
    });

    if (exstingEnrollment)
      throw new BadRequestException('Enrollment Already Exist!');

    const enroll = this.enrollmentRepo.create({
      student,
      course,
      status: status || EnrollmentStatus.ACTIVE,
    });

    return this.enrollmentRepo.save(enroll);
  }

  findAll() {
    return this.enrollmentRepo.find({ relations: ['student', 'course'] });
  }

  async findOne(id: number) {
    const enrollment = await this.enrollmentRepo.findOne({
      where: { id },
      relations: ['student', 'course'],
    });

    if (!enrollment) throw new NotFoundException('Enrollment Not Found!');
    return enrollment;
  }

  update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return `This action updates a #${id} enrollment`;
  }

  remove(id: number) {
    return this.enrollmentRepo.softDelete(id);
  }

restore(id:number){
  return this.enrollmentRepo.restore(id);
}

}
