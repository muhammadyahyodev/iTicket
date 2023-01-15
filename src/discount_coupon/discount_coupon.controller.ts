import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GuardForAll } from 'src/guards/all.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { DiscountCouponService } from './discount_coupon.service';
import { CreateDiscountCouponDto } from './dto/create-discount_coupon.dto';
import { UpdateDiscountCouponDto } from './dto/update-discount_coupon.dto';
import { DiscountCoupon } from './Schemas/discount_coupon.model';

@ApiTags('Discount coupon')
@Controller('discount-coupon')
export class DiscountCouponController {
  constructor(private readonly discountCouponService: DiscountCouponService) {}

  @ApiOperation({ summary: 'create discount coupon' })
  @ApiResponse({ status: 200, type: [DiscountCoupon] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createDiscountCouponDto: CreateDiscountCouponDto) {
    return this.discountCouponService.createDiscountCoupon(
      createDiscountCouponDto,
    );
  }

  @ApiOperation({ summary: 'get discount coupons' })
  @ApiResponse({ status: 200, type: [DiscountCoupon] })
  @ApiBearerAuth()
  @UseGuards(GuardForAll)
  @Get()
  findAll() {
    return this.discountCouponService.findAll();
  }

  @ApiOperation({ summary: 'get discount coupon by id' })
  @ApiResponse({ status: 200, type: [DiscountCoupon] })
  @ApiBearerAuth()
  @UseGuards(GuardForAll)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountCouponService.findDiscountCouponById(+id);
  }

  @ApiOperation({ summary: 'update discount coupon by id' })
  @ApiResponse({ status: 200, type: [DiscountCoupon] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscountCouponDto: UpdateDiscountCouponDto,
  ) {
    return this.discountCouponService.updateDiscountCouponById(
      +id,
      updateDiscountCouponDto,
    );
  }

  @ApiOperation({ summary: 'delete discount coupon by id' })
  @ApiResponse({ status: 200, type: [DiscountCoupon] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountCouponService.removeDiscountCoupon(+id);
  }
}
