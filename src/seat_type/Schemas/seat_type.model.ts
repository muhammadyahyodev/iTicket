import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface SeatTypeCretionAttrs {
  readonly name: string;
}

@Table({ tableName: 'seat_type' })
export class SeatType extends Model<SeatType, SeatTypeCretionAttrs> {
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
