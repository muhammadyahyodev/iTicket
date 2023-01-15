import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Anna', description: 'first name customer' })
  @IsNotEmpty()
  @IsString()
  readonly first_name: string;

  @ApiProperty({ example: 'Kristi', description: 'last name customer' })
  @IsNotEmpty()
  @IsString()
  readonly last_name: string;

  @ApiProperty({ example: '+90 122 344 112', description: 'phon number' })
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty({ example: 'anna@gmail.com', description: 'customer email' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'customer password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ example: '1990-12-12', description: 'birth day customer' })
  @IsNotEmpty()
  @IsString()
  readonly birth_date: string;

  @ApiProperty({ example: 'femail', description: 'customer gender' })
  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @ApiProperty({ example: 'ru', description: 'language id' })
  @IsNotEmpty()
  @IsNumber()
  readonly lang_id: number;
}
