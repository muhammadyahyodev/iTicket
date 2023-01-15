import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryMethodDto {
  @ApiProperty({
    example: 'delivery method',
    description: 'delivery method name',
  })
  @IsOptional()
  @IsString()
  readonly name: string;
}
