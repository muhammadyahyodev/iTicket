import { Module } from '@nestjs/common';
import { TicketTypeService } from './ticket_type.service';
import { TicketTypeController } from './ticket_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TicketType } from './Schemas/ticket_type.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([TicketType]), JwtModule],
  controllers: [TicketTypeController],
  providers: [TicketTypeService],
})
export class TicketTypeModule {}
