import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
