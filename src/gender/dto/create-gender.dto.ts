import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenderDto {
  @ApiProperty({ example: 'male', description: 'gender' })
  @IsNotEmpty()
  @IsString()
  readonly gender: string;
}
