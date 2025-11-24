import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  hanldeLogin(@Body() loginDto: AuthLoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('register')
  hanldeRegister(@Body() reigsterDto: AuthRegisterDto) {
    return this.authService.register(reigsterDto);
  }
}
