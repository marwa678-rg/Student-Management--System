import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Student, Profile])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
