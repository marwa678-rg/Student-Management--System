import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StudentModule } from './student/student.module';
import { ProfileModule } from './profile/profile.module';
import { TeacherModule } from './teacher/teacher.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Student } from './student/entities/student.entity';
import { Course } from './course/entities/course.entity';
import { Profile } from './profile/entities/profile.entity';
import { Teacher } from './teacher/entities/teacher.entity';
import { Enrollment } from './enrollment/entities/enrollment.entity';

// sequlize.auth
// squlize.sync

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      // type: process.env.DB_DRIVER as TypeOrmModuleOptions['type'],
      type: 'mysql',
      database: process.env.DB_NAME,

      entities: [User, Student, Course, Profile, Teacher, Enrollment], // Sync
      synchronize: true, // Dev
    }),

    AuthModule,
    UserModule,
    StudentModule,
    ProfileModule,
    TeacherModule,
    CourseModule,
    EnrollmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
