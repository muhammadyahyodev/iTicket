import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerCardDto {
  @ApiProperty({ example: '1', description: 'customer id' })
  @IsNotEmpty()
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({ example: 'humo', description: 'name cart' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '+90 123 452 321', description: 'phone' })
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty({ example: '2022', description: 'year' })
  @IsNotEmpty()
  @IsString()
  readonly year: string;

  @ApiProperty({ example: 'november', description: 'month' })
  @IsNotEmpty()
  @IsString()
  readonly month: string;

  @ApiProperty({ example: 'true', description: 'activate' })
  @IsNotEmpty()
  @IsBoolean()
  readonly is_active: boolean;

  @ApiProperty({ example: '1', description: 'customer id' })
  @IsNotEmpty()
  @IsBoolean()
  readonly is_main: boolean;
}
