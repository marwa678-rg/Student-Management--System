import { Course } from 'src/course/entities/course.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Relations => Course - Profile
// Student vs Profile => 1 to 1 => studentId => profile - profileId => student
// Student vs Course => M to N => Create new Table "Junction" => Enrollment

// 1 to many =>
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  // 1 : 1
  @OneToOne(() => Profile, (profile) => profile.student)
  @JoinColumn()
  // @Index({ unique: true })
  profile: Profile; // typescript Student => Profile Obj

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @DeleteDateColumn()
  deleteAt: Date;

  // M : N
  //   @ManyToMany(() => Course, (course) => course.students)
  //   @JoinTable()
  //   courses: Course[];
}

// new Student().profile.id
