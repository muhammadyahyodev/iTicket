import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({ example: 'Mustaqillik bayrami', description: 'event name' })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'photo', description: 'event photo' })
  @IsOptional()
  @IsString()
  readonly photo: string;

  @ApiProperty({ example: '2022-12-28', description: 'start date' })
  @IsOptional()
  @IsString()
  readonly start_date: string;

  @ApiProperty({ example: '17:00', description: 'start time' })
  @IsOptional()
  @IsString()
  readonly start_time: string;

  @ApiProperty({ example: '2023-01-05', description: 'finish date' })
  @IsOptional()
  @IsString()
  readonly finish_date: string;

  @ApiProperty({ example: '21:00', description: 'finish time' })
  @IsOptional()
  @IsString()
  readonly finish_time: string;

  @ApiProperty({ example: 'info', description: 'info' })
  @IsOptional()
  @IsString()
  readonly info: string;

  @ApiProperty({ example: '1', description: 'event type id' })
  @IsOptional()
  @IsNumber()
  readonly event_type_id: number;

  @ApiProperty({ example: '7', description: 'human category id' })
  @IsOptional()
  @IsNumber()
  readonly human_category_id: number;

  @ApiProperty({ example: '9', description: 'venue id' })
  @IsOptional()
  @IsNumber()
  readonly venue_id: number;

  @ApiProperty({ example: '3', description: 'language id' })
  @IsOptional()
  @IsNumber()
  readonly lang_id: number;

  @ApiProperty({ example: 'release date', description: 'release date' })
  @IsOptional()
  @IsString()
  readonly release_date: string;
}
