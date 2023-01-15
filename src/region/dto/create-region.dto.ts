import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ example: 'Idaho', description: 'region name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: '225321351352',
    description: 'region number',
  })
  @IsNotEmpty()
  @IsString()
  readonly region_number: string;
}
