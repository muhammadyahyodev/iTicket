import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Hamid', description: 'name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'hamid@gmail.com', description: 'admin email' })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'qwerty', description: 'admin password' })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  // @ApiProperty({ example: 'true', description: 'activate value' })
  // @IsNotEmpty()
  // @IsBoolean()
  // readonly is_active: boolean;

  // @ApiProperty({ example: 'false', description: 'mainly admin' })
  // @IsNotEmpty()
  // @IsBoolean()
  // readonly is_creator: boolean;
}
