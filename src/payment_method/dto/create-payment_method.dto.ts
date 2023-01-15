import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty({
    example: 'payment method name',
    description: 'payment method name',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
