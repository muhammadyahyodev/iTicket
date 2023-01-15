import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { SeatType } from 'src/seat_type/Schemas/seat_type.model';
import { Venue } from 'src/venue/Schemas/venue.model';

interface SeatCretionAttrs {
  readonly sector: string;
  readonly row_number: number;
  readonly number: number;
}

@Table({ tableName: 'seat' })
export class Seat extends Model<Seat, SeatCretionAttrs> {
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
  sector: string;

  @Column({
    type: DataType.INTEGER,
  })
  row_number: number;

  @Column({
    type: DataType.INTEGER,
  })
  number: number;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
  })
  venue_id: number;

  @ForeignKey(() => SeatType)
  @Column({
    type: DataType.INTEGER,
  })
  seat_type_id: number;

  @Column({
    type: DataType.STRING,
  })
  location_in_schema: string;

  @BelongsTo(() => Venue)
  venues: Venue[];

  @BelongsTo(() => SeatType)
  seatTypes: SeatType[];
}
