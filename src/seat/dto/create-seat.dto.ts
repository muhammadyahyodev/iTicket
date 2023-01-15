import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSeatDto {
  @ApiProperty({ example: 'A', description: 'sector' })
  @IsNotEmpty()
  @IsString()
  readonly sector: string;

  @ApiProperty({ example: '30', description: 'row number' })
  @IsNotEmpty()
  @IsNumber()
  readonly row_number: number;

  @ApiProperty({ example: '10', description: 'number seat' })
  @IsNotEmpty()
  @IsNumber()
  readonly number: number;

  @ApiProperty({ example: '4', description: 'venue id' })
  @IsNotEmpty()
  @IsNumber()
  readonly venue_id: number;

  @ApiProperty({ example: 'length', description: 'seat type id' })
  @IsNotEmpty()
  @IsNumber()
  readonly seat_type_id: number;

  @ApiProperty({ example: 'right', description: 'location in schema' })
  @IsNotEmpty()
  @IsString()
  readonly location_in_schema: string;
}
