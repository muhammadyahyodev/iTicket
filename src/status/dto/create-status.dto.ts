import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'in process', description: 'status name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
