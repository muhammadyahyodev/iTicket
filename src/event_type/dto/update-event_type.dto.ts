import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateEventTypeDto {
  @ApiProperty({ example: 'concert', description: 'event type name' })
  @IsOptional()
  @IsString()
  name: string;
}
