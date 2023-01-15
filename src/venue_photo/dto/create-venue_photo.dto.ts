import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVenuePhotoDto {
  @ApiProperty({ example: '1', description: 'venue id' })
  @IsNotEmpty()
  @IsNumber()
  venue_id: number;

  @ApiProperty({ example: 'url', description: 'url' })
  @IsNotEmpty()
  @IsString()
  url: string;
}
