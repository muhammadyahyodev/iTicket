import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({ example: 'UK', description: 'country name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
