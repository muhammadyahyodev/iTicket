import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './Schemas/event.model';
import { Venue } from 'src/venue/Schemas/venue.model';
import { HumanCategory } from 'src/human_category/Schemas/human_category.model';
import { Language } from 'src/language/Schemas/language.model';
import { EventType } from 'src/event_type/Schemas/event_type.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Event,
      Venue,
      HumanCategory,
      Language,
      EventType,
    ]),
    JwtModule,
    FilesModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
