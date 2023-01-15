import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Mustaqillik bayrami', description: 'event name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: '2022-12-28', description: 'start date' })
  @IsNotEmpty()
  @IsString()
  readonly start_date: string;

  @ApiProperty({ example: '17:00', description: 'start time' })
  @IsNotEmpty()
  @IsString()
  readonly start_time: string;

  @ApiProperty({ example: '2023-01-05', description: 'finish date' })
  @IsNotEmpty()
  @IsString()
  readonly finish_date: string;

  @ApiProperty({ example: '21:00', description: 'finish time' })
  @IsNotEmpty()
  @IsString()
  readonly finish_time: string;

  @ApiProperty({ example: 'info', description: 'info' })
  @IsNotEmpty()
  @IsString()
  readonly info: string;

  @ApiProperty({ example: '1', description: 'event type id' })
  readonly event_type_id: number;

  @ApiProperty({ example: '7', description: 'human category id' })
  readonly human_category_id: number;

  @ApiProperty({ example: '9', description: 'venue id' })
  readonly venue_id: number;

  @ApiProperty({ example: '3', description: 'language id' })
  readonly lang_id: number;

  @ApiProperty({ example: 'release date', description: 'release date' })
  @IsNotEmpty()
  @IsString()
  readonly release_date: string;
}
