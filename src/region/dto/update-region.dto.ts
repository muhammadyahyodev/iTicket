import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRegionDto {
  @ApiProperty({ example: 'Idaho', description: 'region name' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: '225321351352',
    description: 'region number',
  })
  @IsOptional()
  @IsString()
  readonly region_number: string;
}
