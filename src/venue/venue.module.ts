import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Venue } from './Schemas/venue.model';
import { JwtModule } from '@nestjs/jwt';
import { Region } from 'src/region/Schemas/region.model';
import { District } from 'src/district/Schemas/district.model';
import { VenueType } from 'src/venue_type/Schemas/venue_type.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Venue, VenueType, Region, District]),
    JwtModule,
  ],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
