import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({ example: 'Anna', description: 'first name customer' })
  @IsOptional()
  @IsString()
  readonly first_name: string;

  @ApiProperty({ example: 'Kristi', description: 'last name customer' })
  @IsOptional()
  @IsString()
  readonly last_name: string;

  @ApiProperty({ example: '+90 122 344 112', description: 'phon number' })
  @IsOptional()
  @IsString()
  readonly phone: string;

  @ApiProperty({ example: 'anna@gmail.com', description: 'customer email' })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'customer password' })
  @IsOptional()
  @IsString()
  readonly password: string;

  @ApiProperty({ example: '1990-12-12', description: 'birth day customer' })
  @IsOptional()
  @IsString()
  readonly birth_date: string;

  @ApiProperty({ example: 'femail', description: 'customer gender' })
  @IsOptional()
  @IsString()
  readonly gender: string;

  @ApiProperty({ example: 'ru', description: 'language id' })
  @IsOptional()
  @IsNumber()
  readonly lang_id: number;
}
