import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Event } from 'src/event/Schemas/event.model';
import { Seat } from 'src/seat/Schemas/seat.model';
import { Status } from 'src/status/Schemas/status.model';

@Table({ tableName: 'ticket' })
export class Ticket extends Model<Ticket> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Event)
  @Column({
    type: DataType.INTEGER,
  })
  event_id: number;

  @BelongsTo(() => Event)
  events: Event[];

  @ForeignKey(() => Seat)
  @Column({
    type: DataType.INTEGER,
  })
  seat_id: number;

  @BelongsTo(() => Seat)
  seats: Seat[];

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
  })
  service_fee: number;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @BelongsTo(() => Status)
  status: Status[];

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER,
  })
  ticket_type: number;

  @BelongsTo(() => Ticket)
  tickets: Ticket[];
}
