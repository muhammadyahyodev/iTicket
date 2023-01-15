import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketTypeDto {
  @ApiProperty({ example: 'ticket type', description: 'ticket type' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
