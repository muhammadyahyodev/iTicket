import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHumanCategoryDto {
  @ApiProperty({ example: 'child', description: 'human category name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '16+', description: 'start age' })
  @IsNotEmpty()
  @IsNumber()
  readonly start_age: number;

  @ApiProperty({ example: '16+', description: 'finish age' })
  @IsNotEmpty()
  @IsNumber()
  readonly finish_age: number;

  @ApiProperty({ example: '3', description: 'gender id' })
  @IsNotEmpty()
  @IsNumber()
  readonly gender_id: number;
}
