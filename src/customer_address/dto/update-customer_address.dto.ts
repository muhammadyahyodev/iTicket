import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerAddressDto {
  @ApiProperty({ example: '6', description: 'customer id' })
  @IsOptional()
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({ example: 'anna', description: 'customer name' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '1', description: 'country id' })
  @IsOptional()
  @IsNumber()
  readonly country_id: number;

  @ApiProperty({ example: '5', description: 'region id' })
  @IsOptional()
  @IsNumber()
  readonly region_id: number;

  @ApiProperty({ example: '6', description: 'district id' })
  @IsOptional()
  @IsNumber()
  readonly district_id: number;

  @ApiProperty({ example: 'broadway', description: 'street' })
  @IsOptional()
  @IsString()
  readonly street: string;

  @ApiProperty({ example: 'house', description: 'house' })
  @IsOptional()
  @IsString()
  readonly house: string;

  @ApiProperty({ example: 'C13, 24 kvartal', description: 'flat customer' })
  @IsOptional()
  @IsString()
  readonly flat: string;

  @ApiProperty({
    example: 'Chilonzor',
    description: 'location customer address',
  })
  @IsOptional()
  @IsString()
  readonly location: string;

  @ApiProperty({ example: 'info', description: 'info customer address' })
  @IsOptional()
  @IsString()
  readonly info: string;
}
