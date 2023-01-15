import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { ForeignKey } from 'sequelize-typescript';
import { Ticket } from '../Schemas/ticket.model';

export class UpdateTicketDto {
  @ApiProperty({ example: '1', description: 'event id' })
  @IsOptional()
  @IsNumber()
  readonly event_id: number;

  @ApiProperty({ example: '1', description: 'seat id' })
  @IsOptional()
  @IsNumber()
  readonly seat_id: number;

  @ApiProperty({ example: '12 000', description: 'ticket price' })
  @IsOptional()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: '2', description: 'service fee' })
  @IsOptional()
  @IsNumber()
  readonly service_fee: number;

  @ApiProperty({ example: '1', description: 'event id' })
  @IsOptional()
  @IsNumber()
  readonly status_id: number;

  @ApiProperty({ example: '1', description: 'ticket type id' })
  @ForeignKey(() => Ticket)
  @IsOptional()
  @IsNumber()
  readonly ticket_type_id: number;
}
