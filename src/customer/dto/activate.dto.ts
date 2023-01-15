import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class ActivateDto {
  @ApiProperty({ example: '2', description: 'activate customer id' })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ example: 'false', description: 'activate value' })
  @IsNotEmpty()
  @IsBoolean()
  readonly value: boolean;
}
