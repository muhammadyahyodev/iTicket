import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ForeignKey } from 'sequelize-typescript';
import { Ticket } from '../Schemas/ticket.model';

export class CreateTicketDto {
  @ApiProperty({ example: '1', description: 'event id' })
  @IsNotEmpty()
  @IsNumber()
  readonly event_id: number;

  @ApiProperty({ example: '1', description: 'seat id' })
  @IsNotEmpty()
  @IsNumber()
  readonly seat_id: number;

  @ApiProperty({ example: '2', description: 'service fee' })
  @IsNotEmpty()
  @IsNumber()
  readonly service_fee: number;

  @ApiProperty({ example: '1', description: 'event id' })
  @IsNotEmpty()
  @IsNumber()
  readonly status_id: number;

  @ApiProperty({ example: '1', description: 'ticket type id' })
  @IsNotEmpty()
  @IsNumber()
  readonly ticket_type_id: number;
}
