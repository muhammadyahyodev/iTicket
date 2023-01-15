import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerCardDto {
  @ApiProperty({ example: '1', description: 'customer id' })
  @IsOptional()
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({ example: 'humo', description: 'name cart' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '+90 123 452 321', description: 'phone' })
  @IsOptional()
  @IsString()
  readonly phone: string;

  @ApiProperty({ example: '2022', description: 'year' })
  @IsOptional()
  @IsString()
  readonly year: string;

  @ApiProperty({ example: 'november', description: 'month' })
  @IsOptional()
  @IsString()
  readonly month: string;

  @ApiProperty({ example: 'true', description: 'activate' })
  @IsOptional()
  @IsBoolean()
  readonly is_active: boolean;

  @ApiProperty({ example: '1', description: 'customer id' })
  @IsOptional()
  @IsBoolean()
  readonly is_main: boolean;
}
