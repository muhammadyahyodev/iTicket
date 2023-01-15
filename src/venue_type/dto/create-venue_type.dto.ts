import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVenueTypeDto {
  @ApiProperty({ example: 'right', description: 'venue type' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
