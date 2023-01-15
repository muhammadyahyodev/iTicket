import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDiscountCouponDto {
  @ApiProperty({ example: '12-12-2020', description: 'start date' })
  @IsOptional()
  @IsString()
  readonly start_date: string;

  @ApiProperty({ example: '05-01-2021', description: 'finish date' })
  @IsOptional()
  @IsString()
  readonly finish_date: string;

  @ApiProperty({ example: '1', description: 'customer id' })
  @IsOptional()
  @IsNumber()
  readonly customer_id: number;
}
