import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

@IsString()
@IsEmail()
@IsNotEmpty()
email:string;


}
