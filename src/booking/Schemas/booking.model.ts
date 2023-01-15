import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from 'src/cart/Schemas/cart.model';
import { DeliveryMethod } from 'src/delivery_method/Schemas/delivery_method.model';
import { DiscountCoupon } from 'src/discount_coupon/Schemas/discount_coupon.model';
import { PaymentMethod } from 'src/payment_method/Schemas/payment_method.model';
import { Status } from 'src/status/Schemas/status.model';

@Table({ tableName: 'booking' })
export class Booking extends Model<Booking> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
  })
  cart_id: number;

  @Column({
    type: DataType.STRING,
  })
  createdAt: string;

  @Column({
    type: DataType.STRING,
  })
  finished: string;

  @ForeignKey(() => PaymentMethod)
  @Column({
    type: DataType.INTEGER,
  })
  payment_method_id: number;

  @BelongsTo(() => PaymentMethod)
  paymentMethod: PaymentMethod[];

  @ForeignKey(() => DeliveryMethod)
  @Column({
    type: DataType.INTEGER,
  })
  delivery_method_id: number;

  @BelongsTo(() => DeliveryMethod)
  deliveryMethod: DeliveryMethod[];

  @ForeignKey(() => DiscountCoupon)
  @Column({
    type: DataType.INTEGER,
  })
  discount_coupon_id: number;

  @BelongsTo(() => DiscountCoupon)
  discountCoupon: DiscountCoupon[];

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  status_id: number;

  @BelongsTo(() => Status)
  status: Status[];
}
