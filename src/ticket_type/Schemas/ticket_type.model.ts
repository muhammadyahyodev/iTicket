import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'ticket_type' })
export class TicketType extends Model<TicketType> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;
}
