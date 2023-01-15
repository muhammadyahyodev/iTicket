import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @ApiProperty({ example: 'UK', description: 'country name' })
  @IsOptional()
  @IsString()
  readonly name: string;
}
