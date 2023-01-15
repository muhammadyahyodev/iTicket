import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'en', description: 'language name' })
  @IsNotEmpty()
  @IsString()
  readonly language: string;
}
