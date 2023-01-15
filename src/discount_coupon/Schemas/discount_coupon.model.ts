import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Customer } from 'src/customer/Schemas/customer.model';

@Table({ tableName: 'discount_coupon' })
export class DiscountCoupon extends Model<DiscountCoupon> {
  @ApiProperty({ example: '1', description: 'id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '2002-12-12', description: 'start date' })
  @Column({
    type: DataType.DATE,
  })
  start_date: string;

  @ApiProperty({ example: '2020-12-12', description: 'finish date' })
  @Column({
    type: DataType.DATE,
  })
  finish_date: string;

  @ApiProperty({ example: '1', description: 'customer id' })
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
  })
  customer_id: number;

  @BelongsTo(() => Customer)
  customers: Customer[];
}
