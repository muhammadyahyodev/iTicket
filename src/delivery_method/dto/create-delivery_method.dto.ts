import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeliveryMethodDto {
  @ApiProperty({
    example: 'delivery method',
    description: 'delivery method name',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
