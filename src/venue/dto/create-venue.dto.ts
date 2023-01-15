import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ForeignKey } from 'sequelize-typescript';
import { District } from 'src/district/Schemas/district.model';
import { Region } from 'src/region/Schemas/region.model';

export class CreateVenueDto {
  @ApiProperty({ example: 'Turkiston saroyi', description: 'venue name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'address', description: 'address' })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({ example: 'location', description: 'location' })
  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @ApiProperty({
    example: '+998 90 547 12 46',
    description: 'venue phone number',
  })
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @ApiProperty({ example: '4', description: 'venue type id' })
  @IsNotEmpty()
  @IsNumber()
  readonly venue_type_id: number;

  @ApiProperty({ example: 'schema', description: 'schema' })
  @IsNotEmpty()
  @IsString()
  readonly schema: string;

  @ForeignKey(() => Region)
  @ApiProperty({ example: '5', description: 'region id' })
  @IsNotEmpty()
  // @IsString()
  @IsNumber()
  readonly region_id: number;

  @ForeignKey(() => District)
  @ApiProperty({ example: '1', description: 'district id' })
  @IsNotEmpty()
  // @IsString()
  @IsNumber()
  readonly district_id: number;
}
