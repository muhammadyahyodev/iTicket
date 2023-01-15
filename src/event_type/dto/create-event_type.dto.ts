import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventTypeDto {
  @ApiProperty({ example: 'concert', description: 'event type name' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
