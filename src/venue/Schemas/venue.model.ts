import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { District } from 'src/district/Schemas/district.model';
import { Region } from 'src/region/Schemas/region.model';
import { VenueType } from 'src/venue_type/Schemas/venue_type.model';

interface VenueCreationAttrs {
  readonly name: string;
  readonly address: string;
  readonly location: string;
}

@Table({ tableName: 'venue' })
export class Venue extends Model<Venue, VenueCreationAttrs> {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ForeignKey(() => VenueType)
  @Column({
    type: DataType.INTEGER,
  })
  venue_type_id: number;

  @BelongsTo(() => VenueType)
  venueType: VenueType;

  @Column({
    type: DataType.STRING,
  })
  schema: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @BelongsTo(() => Region)
  region: Region;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;

  @BelongsTo(() => District)
  districts: District[];
}
