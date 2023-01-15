import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: '1', description: 'ticket id' })
  @IsNotEmpty()
  @IsNumber()
  readonly ticket_id: number;

  @ApiProperty({ example: '1', description: 'customer id' })
  @IsNotEmpty()
  @IsNumber()
  readonly customer_id: number;

  @ApiProperty({ example: '1', description: 'status id' })
  @IsNotEmpty()
  @IsNumber()
  readonly status_id: number;
}
