import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVenueDto {
  @ApiProperty({ example: 'Turkiston saroyi', description: 'venue name' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'address', description: 'address' })
  @IsOptional()
  @IsString()
  readonly address: string;

  @ApiProperty({ example: 'location', description: 'location' })
  @IsOptional()
  @IsString()
  readonly location: string;

  @ApiProperty({
    example: '+998 90 547 12 46',
    description: 'venue phone number',
  })
  @IsOptional()
  @IsString()
  readonly phone: string;

  @ApiProperty({ example: '4', description: 'venue type id' })
  @IsOptional()
  @IsNumber()
  readonly venue_type_id: number;

  @ApiProperty({ example: 'schema', description: 'schema' })
  @IsOptional()
  @IsString()
  readonly schema: string;

  @ApiProperty({ example: '5', description: 'region id' })
  @IsOptional()
  @IsString()
  readonly region_id: number;

  @ApiProperty({ example: '1', description: 'district id' })
  @IsOptional()
  @IsString()
  readonly district_id: number;
}
