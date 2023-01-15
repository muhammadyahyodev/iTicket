import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSeatTypeDto {
  @ApiProperty({ example: 'right', description: 'seat name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
