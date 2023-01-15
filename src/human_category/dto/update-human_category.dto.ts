import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateHumanCategoryDto {
  @ApiProperty({ example: 'child', description: 'human category name' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '16+', description: 'start age' })
  @IsOptional()
  @IsNumber()
  readonly start_age: number;

  @ApiProperty({ example: '16+', description: 'finish age' })
  @IsOptional()
  @IsNumber()
  readonly finish_age: number;

  @ApiProperty({ example: '3', description: 'gender id' })
  @IsOptional()
  @IsString()
  readonly gender_id: number;
}
