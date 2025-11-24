import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Student vs Course => M to N => Create new Table "Junction" => Enrollment

// HTML - CSS - MOHAMED
// Teacher => M : 1

// Course vs Teacher
// M   => 1
@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, unique: true })
  code: string; // HTML5

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  teacher: Teacher;

  //   @ManyToMany(() => Student, (student) => student.courses)
  //   students: Student[];
}
