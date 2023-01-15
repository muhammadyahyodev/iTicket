import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiscountCouponDto {
  @ApiProperty({ example: '12-12-2020', description: 'start date' })
  @IsNotEmpty()
  @IsString()
  readonly start_date: string;

  @ApiProperty({ example: '05-01-2021', description: 'finish date' })
  @IsNotEmpty()
  @IsString()
  readonly finish_date: string;

  @ApiProperty({ example: '1', description: 'customer id' })
  @IsNotEmpty()
  @IsNumber()
  readonly customer_id: number;
}
