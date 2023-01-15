import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { District } from './Schemas/district.model';
import { Region } from 'src/region/Schemas/region.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([District, Region]), JwtModule],
  controllers: [DistrictController],
  providers: [DistrictService],
})
export class DistrictModule {}
