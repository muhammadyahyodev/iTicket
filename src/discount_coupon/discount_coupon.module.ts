import { Module } from '@nestjs/common';
import { DiscountCouponService } from './discount_coupon.service';
import { DiscountCouponController } from './discount_coupon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscountCoupon } from './Schemas/discount_coupon.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([DiscountCoupon]), JwtModule],
  controllers: [DiscountCouponController],
  providers: [DiscountCouponService],
  exports: [DiscountCouponService],
})
export class DiscountCouponModule {}
