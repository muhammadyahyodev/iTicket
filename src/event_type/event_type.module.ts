import { Module } from '@nestjs/common';
import { EventTypeService } from './event_type.service';
import { EventTypeController } from './event_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventType } from './Schemas/event_type.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([EventType]), JwtModule],
  controllers: [EventTypeController],
  providers: [EventTypeService],
})
export class EventTypeModule {}
