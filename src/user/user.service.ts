import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  findAll(withDeleted: boolean) {
    return this.userRepo.find({ withDeleted });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User Not Found!');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepo.update(id, updateUserDto);
    return this.findOne(id);
  }

  // Soft Delete
  async remove(id: number) {
    await this.findOne(id);
    await this.userRepo.softDelete(id);

    return 'User Delete Successfully!';
  }

  async restore(id: number) {
    const result = await this.userRepo.restore(id);
    if (result.affected == 0) throw new NotFoundException('User Not Found!');
    return 'User Restored Successfully!';
  }
}
