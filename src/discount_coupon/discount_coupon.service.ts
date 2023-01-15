import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDiscountCouponDto, UpdateDiscountCouponDto } from './dto';
import { DiscountCoupon } from './Schemas/discount_coupon.model';

@Injectable()
export class DiscountCouponService {
  constructor(
    @InjectModel(DiscountCoupon)
    private readonly discountCouponRepository: typeof DiscountCoupon,
  ) {}

  async createDiscountCoupon(createDiscountCouponDto: CreateDiscountCouponDto) {
    const discountCoupon = await this.discountCouponRepository.create(
      createDiscountCouponDto,
    );
    return discountCoupon;
  }

  async findAll() {
    const discountCoupons = await this.discountCouponRepository.findAll({
      include: { all: true },
    });
    return discountCoupons;
  }

  async findDiscountCouponById(id: number) {
    const discountCoupon = await this.discountCouponRepository.findByPk(id);
    if (!discountCoupon) {
      throw new HttpException(
        'Discount method not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return discountCoupon;
  }

  async updateDiscountCouponById(
    id: number,
    updateDiscountCouponDto: UpdateDiscountCouponDto,
  ) {
    await this.findDiscountCouponById(id);

    const discountCoupon = await this.discountCouponRepository.update(
      updateDiscountCouponDto,
      { where: { id }, returning: true },
    );
    return discountCoupon[1][0];
  }

  async removeDiscountCoupon(id: number) {
    await this.findDiscountCouponById(id);
    await this.discountCouponRepository.destroy({ where: { id } });

    return id;
  }
}
