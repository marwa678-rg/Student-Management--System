import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async login(loginDto: AuthLoginDto) {
    const user = await this.userRepo.findOne({
      where: { username: loginDto.username },
      withDeleted: true,
    });
    if (!user) throw new BadRequestException('Invalid Credentails');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new BadRequestException('Invalid Credentails');

    if (user.deleteAt != null) {
      // soft delete => de-activiate
      return { isDeleted: true, message: 'Account Disabled' };
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });

    return { token };
  }

  async register(registerDto: AuthRegisterDto) {
    const exstingUser = await this.userRepo.findOne({
      where: {
        username: registerDto.username,
      },
    });

    if (exstingUser) throw new ConflictException('Username Alread Exist!');

    registerDto.password = await bcrypt.hash(registerDto.password, 12);

    // Create => Build
    const user = this.userRepo.create(registerDto);
    await this.userRepo.save(user);

    const token = this.jwtService.sign({ id: user.id, role: user.role });

    return { token };
  }
}
