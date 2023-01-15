import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVenuePhotoDto {
  @ApiProperty({ example: '1', description: 'venue id' })
  @IsOptional()
  @IsNumber()
  venue_id: number;

  @ApiProperty({ example: 'url', description: 'url' })
  @IsOptional()
  @IsString()
  url: string;
}
