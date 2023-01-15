import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSeatTypeDto {
  @ApiProperty({ example: 'right', description: 'seat name' })
  @IsOptional()
  @IsString()
  readonly name: string;
}
