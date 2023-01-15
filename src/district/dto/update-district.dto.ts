import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDistrictDto {
  @ApiProperty({ example: 'Idaho', description: 'district name' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: '43634634632314112', description: 'district number' })
  @IsOptional()
  @IsString()
  district_number: string;

  @ApiProperty({ example: '1', description: 'region id' })
  @IsOptional()
  @IsNumber()
  region_id: number;
}
