import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTicketTypeDto {
  @ApiProperty({ example: 'ticket type', description: 'ticket type' })
  @IsOptional()
  @IsString()
  readonly name: string;
}
