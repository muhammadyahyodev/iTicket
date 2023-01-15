import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
  @ApiProperty({
    example: 'payment method name',
    description: 'payment method name',
  })
  @IsOptional()
  @IsString()
  readonly name: string;
}
