import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Venue } from 'src/venue/Schemas/venue.model';

interface VenuePhotoCretionAttrs {
  venue_id: number;
  url: string;
}

@Table({ tableName: 'venue_photo' })
export class VenuePhoto extends Model<VenuePhoto, VenuePhotoCretionAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER })
  venue_id: number;

  @Column({ type: DataType.STRING })
  url: string;

  @BelongsTo(() => Venue)
  venues: Venue[];
}
