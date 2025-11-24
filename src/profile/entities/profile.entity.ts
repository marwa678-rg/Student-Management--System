import { Student } from 'src/student/entities/student.entity';
import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Student vs Profile => 1 to 1 => studentId => profile - profileId => student

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  phone: string;

  // 1 : 1
  @OneToOne(() => Student, (student) => student.profile)
  student: Student;
}
