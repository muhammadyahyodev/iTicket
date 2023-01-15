import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Country } from 'src/country/Schemas/country.model';
import { Customer } from 'src/customer/Schemas/customer.model';
import { District } from 'src/district/Schemas/district.model';
import { Region } from 'src/region/Schemas/region.model';

@Table({ tableName: 'customer_address' })
export class CustomerAddress extends Model<CustomerAddress> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ForeignKey(() => Country)
  @Column({
    type: DataType.INTEGER,
  })
  country_id: number;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;

  @Column({
    type: DataType.STRING,
  })
  street: string;
  @ApiProperty({ example: '1', description: 'house' })
  @Column({
    type: DataType.STRING,
  })
  house: string;

  @Column({
    type: DataType.STRING,
  })
  flat: string;

  @Column({
    type: DataType.STRING,
  })
  location: string;

  @Column({
    type: DataType.STRING,
  })
  post_index: string;

  @Column({
    type: DataType.STRING,
  })
  info: string;

  @BelongsTo(() => Customer)
  customers: Customer[];

  @BelongsTo(() => Country)
  country: Country[];

  @BelongsTo(() => Region)
  regions: Region[];

  @BelongsTo(() => District)
  districts: District[];
}
