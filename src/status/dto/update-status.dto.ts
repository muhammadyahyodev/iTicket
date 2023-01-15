import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({ example: 'in process', description: 'status name' })
  @IsOptional()
  @IsString()
  readonly name: string;
}
