import { IsInt, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  // @IsPhoneNumber()
  phone: string;

  @IsInt() // studentId => number
  @IsNotEmpty()
  studentId: number;
}
