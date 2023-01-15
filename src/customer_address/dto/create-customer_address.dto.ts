import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerAddressDto {
  @ApiProperty({ example: '6', description: 'customer id' })
  @IsNotEmpty()
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({ example: 'anna', description: 'customer name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '1', description: 'country id' })
  @IsNotEmpty()
  @IsNumber()
  readonly country_id: number;

  @ApiProperty({ example: '5', description: 'region id' })
  @IsNotEmpty()
  @IsNumber()
  readonly region_id: number;

  @ApiProperty({ example: '6', description: 'district id' })
  @IsNotEmpty()
  @IsNumber()
  readonly district_id: number;

  @ApiProperty({ example: 'broadway', description: 'street' })
  @IsNotEmpty()
  @IsString()
  readonly street: string;

  @ApiProperty({ example: 'house', description: 'house' })
  @IsNotEmpty()
  @IsString()
  readonly house: string;

  @ApiProperty({ example: 'C13, 24 kvartal', description: 'flat customer' })
  @IsNotEmpty()
  @IsString()
  readonly flat: string;

  @ApiProperty({
    example: 'Chilonzor',
    description: 'location customer address',
  })
  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @ApiProperty({ example: 'info', description: 'info customer address' })
  @IsNotEmpty()
  @IsString()
  readonly info: string;
}
