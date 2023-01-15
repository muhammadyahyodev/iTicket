import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Venue } from 'src/venue/Schemas/venue.model';

interface VenueTypeCretionAttrs {
  readonly name: string;
}

@Table({ tableName: 'venue-type' })
export class VenueType extends Model<VenueType, VenueTypeCretionAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  name: string;

  @HasMany(() => Venue)
  venue: Venue
}
