import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ticket } from './Schemas/ticket.model';
import { JwtModule } from '@nestjs/jwt';
import { Seat } from 'src/seat/Schemas/seat.model';
import { Event } from 'src/event/Schemas/event.model';

@Module({
  imports: [SequelizeModule.forFeature([Ticket, Seat, Event]), JwtModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
