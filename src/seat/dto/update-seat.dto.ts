import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSeatDto {
  @ApiProperty({ example: 'A', description: 'sector' })
  @IsOptional()
  @IsString()
  readonly sector: string;

  @ApiProperty({ example: '30', description: 'row number' })
  @IsOptional()
  @IsNumber()
  readonly row_number: number;

  @ApiProperty({ example: '10', description: 'number seat' })
  @IsOptional()
  @IsNumber()
  readonly number: number;

  @ApiProperty({ example: '4', description: 'venue id' })
  @IsOptional()
  @IsNumber()
  readonly venue_id: number;

  @ApiProperty({ example: 'length', description: 'seat type id' })
  @IsOptional()
  @IsNumber()
  readonly seat_type_id: number;

  @ApiProperty({ example: 'right', description: 'location in schema' })
  @IsOptional()
  @IsString()
  readonly location_in_schema: string;
}
