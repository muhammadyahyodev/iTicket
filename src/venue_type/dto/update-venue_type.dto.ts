import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateVenueTypeDto {
  @ApiProperty({ example: 'right', description: 'venue type' })
  @IsOptional()
  @IsString()
  readonly name: string;
}
