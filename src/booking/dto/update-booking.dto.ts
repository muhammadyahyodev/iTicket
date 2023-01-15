import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookingDto {
  @ApiProperty({ example: '3', description: 'cart id' })
  @IsOptional()
  @IsNumber()
  readonly cart_id: number;

  @ApiProperty({ example: '12:30', description: 'created time' })
  @IsOptional()
  @IsString()
  readonly createdAt: string;

  @ApiProperty({ example: '13:00', description: 'finished time' })
  @IsOptional()
  @IsString()
  readonly finished: string;

  @ApiProperty({ example: '7', description: 'payment method id' })
  @IsOptional()
  @IsNumber()
  readonly payment_method_id: number;

  @ApiProperty({ example: '3', description: 'delivery method id' })
  @IsOptional()
  @IsNumber()
  readonly delivery_method_id: number;

  @ApiProperty({ example: '3', description: 'discount coupon id' })
  @IsOptional()
  @IsNumber()
  readonly discount_coupon_id: number;

  @ApiProperty({ example: '3', description: 'status id' })
  @IsOptional()
  @IsNumber()
  readonly status_id: number;
}
