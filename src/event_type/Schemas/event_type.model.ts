import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface EventTypeCretionAttrs {
  readonly name: string;
  readonly parent_event_id: number;
}

@Table({ tableName: 'event_type' })
export class EventType extends Model<EventType, EventTypeCretionAttrs> {
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

  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  parent_event_type_id: number;
}
