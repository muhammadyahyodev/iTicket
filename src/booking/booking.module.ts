import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './Schemas/booking.model';
import { JwtModule } from '@nestjs/jwt';
import { DiscountCouponModule } from 'src/discount_coupon/discount_coupon.module';
import { PaymentMethodModule } from 'src/payment_method/payment_method.module';
import { DeliveryMethodModule } from 'src/delivery_method/delivery_method.module';
import { PaymentMethod } from 'src/payment_method/Schemas/payment_method.model';
import { DeliveryMethod } from 'src/delivery_method/Schemas/delivery_method.model';
import { DiscountCoupon } from 'src/discount_coupon/Schemas/discount_coupon.model';
import { Status } from 'src/status/Schemas/status.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Booking,
      PaymentMethod,
      DeliveryMethod,
      DiscountCoupon,
      Status
    ]),
    JwtModule,
    PaymentMethodModule,
    DeliveryMethodModule,
    DiscountCouponModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
