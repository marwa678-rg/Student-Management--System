import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
