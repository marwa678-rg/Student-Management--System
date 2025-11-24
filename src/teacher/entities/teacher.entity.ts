import { Course } from 'src/course/entities/course.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Course => 1 : M

// Teacher vs Course
// 1     => M

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];

  @DeleteDateColumn()
  deletedAt: Date;
}
