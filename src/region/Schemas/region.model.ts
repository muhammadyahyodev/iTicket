import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Venue } from 'src/venue/Schemas/venue.model';

interface RegionCretionAttrs {
  readonly name: string;
  readonly region_number: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, RegionCretionAttrs> {
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
  region_number: string;
}
