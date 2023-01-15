import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'anna@gmail.com', description: 'customer email' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'customer password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
