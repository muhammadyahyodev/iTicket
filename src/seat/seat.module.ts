import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Seat } from './Schemas/seat.model';
import { JwtModule } from '@nestjs/jwt';
import { Venue } from 'src/venue/Schemas/venue.model';
import { SeatType } from 'src/seat_type/Schemas/seat_type.model';

@Module({
  imports: [SequelizeModule.forFeature([Seat, SeatType, Venue]), JwtModule],
  controllers: [SeatController],
  providers: [SeatService],
})
export class SeatModule {}
