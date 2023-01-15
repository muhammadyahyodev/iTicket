import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Region } from 'src/region/Schemas/region.model';
import { Venue } from 'src/venue/Schemas/venue.model';

interface DistrictCretionAttrs {
  readonly name: string;
  readonly district: string;
  readonly region_id: number;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictCretionAttrs> {
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
    unique: true,
  })
  district_number: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @BelongsTo(() => Region)
  regions: Region[];

  @HasMany(() => Venue)
  venue: Venue;
}
