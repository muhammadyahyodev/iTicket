import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateLanguageDto {
  @ApiProperty({ example: 'en', description: 'language name' })
  @IsOptional()
  @IsString()
  readonly language: string;
}
