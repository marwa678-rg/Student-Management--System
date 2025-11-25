import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/entities/student.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    // Create Profile => User

    // studentId = 1 => role -> student
    const student = await this.studentRepo.findOne({
      where: { id: createProfileDto.studentId },
      relations: ['profile'],
    });

    if (!student) throw new NotFoundException('Student Not Found');

    if (student.profile) throw new BadRequestException('Profile Already Exist');

    const profile = this.profileRepo.create({ ...createProfileDto, student });

    return this.profileRepo.save(profile);
  }

  findAll() {
    return this.profileRepo.find({ relations: ['student'] });
  }

  findOne(id: number) {
    return this.profileRepo.findOne({ where: { id }, relations: ['student'] });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepo.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Profile Not Found');
    return this.profileRepo.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.profileRepo.restore(id);
  }
restore(id:number){
  return this.profileRepo.restore(id);
}

}
