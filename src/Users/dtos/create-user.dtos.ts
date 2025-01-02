import {
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  firstName: string;

  @IsString()
  @Length(3, 50)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must be at least 8 characters long, contain one letter, one number, and one special character.',
  })
  password: string;
}
