import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { EventType } from 'src/event_type/Schemas/event_type.model';
import { HumanCategory } from 'src/human_category/Schemas/human_category.model';
import { Language } from 'src/language/Schemas/language.model';
import { Venue } from 'src/venue/Schemas/venue.model';

interface EventCretionAttrs {
  readonly name: string;
  readonly photo: string;
  readonly start_date: string;
  readonly start_time: string;
  readonly finish_date: string;
  readonly finish_time: string;
}

@Table({ tableName: 'event' })
export class Event extends Model<Event, EventCretionAttrs> {
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
    type: DataType.STRING,
  })
  photo: string;

  @Column({
    type: DataType.STRING,
  })
  start_date: string;

  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @Column({
    type: DataType.STRING,
  })
  finish_date: string;

  @Column({
    type: DataType.STRING,
  })
  finish_time: string;

  @Column({
    type: DataType.STRING,
  })
  info: string;

  @ForeignKey(() => EventType)
  @Column({
    type: DataType.INTEGER,
  })
  event_type_id: number;

  @ForeignKey(() => HumanCategory)
  @Column({
    type: DataType.INTEGER,
  })
  human_category_id: number;

  @ForeignKey(() => Venue)
  @Column({
    type: DataType.INTEGER,
  })
  venue_id: number;

  @ForeignKey(() => Language)
  @Column({
    type: DataType.INTEGER,
  })
  lang_id: number;

  @Column({
    type: DataType.STRING,
  })
  release_date: string;

  @BelongsTo(() => EventType)
  eventtypes: EventType[];

  @BelongsTo(() => HumanCategory)
  humanCategory: HumanCategory[];

  @BelongsTo(() => Venue)
  venues: Venue[];

  @BelongsTo(() => Language)
  languages: Language[];
}
