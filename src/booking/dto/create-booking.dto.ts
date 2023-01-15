import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: '3', description: 'cart id' })
  @IsNotEmpty()
  @IsNumber()
  readonly cart_id: number;

  @ApiProperty({ example: '12:30', description: 'created time' })
  @IsNotEmpty()
  @IsString()
  readonly createdAt: string;

  @ApiProperty({ example: '13:00', description: 'finished time' })
  @IsNotEmpty()
  @IsString()
  readonly finished: string;

  @ApiProperty({ example: '7', description: 'payment method id' })
  @IsNotEmpty()
  @IsNumber()
  readonly payment_method_id: number;

  @ApiProperty({ example: '3', description: 'delivery method id' })
  @IsNotEmpty()
  @IsNumber()
  readonly delivery_method_id: number;

  @ApiProperty({ example: '3', description: 'discount coupon id' })
  @IsNotEmpty()
  @IsNumber()
  readonly discount_coupon_id: number;

  @ApiProperty({ example: '3', description: 'status id' })
  @IsNotEmpty()
  @IsNumber()
  readonly status_id: number;
}
