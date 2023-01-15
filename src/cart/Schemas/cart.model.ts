import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Customer } from 'src/customer/Schemas/customer.model';
import { Status } from 'src/status/Schemas/status.model';
import { Ticket } from 'src/ticket/Schemas/ticket.model';

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Ticket)
  @Column({
    type: DataType.INTEGER,
  })
  ticket_id: number;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @BelongsTo(() => Ticket)
  tickets: Ticket[];

  @BelongsTo(() => Customer)
  customers: Customer[];

  @BelongsTo(() => Status)
  statuses: Status[];
}
