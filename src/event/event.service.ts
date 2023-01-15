import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './Schemas/event.model';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event) private readonly eventRepository: typeof Event,
    private readonly fileService: FilesService,
  ) {}

  async createEvent(createEventDto: CreateEventDto, photo: any) {
    try {
      const { name, event_type_id, venue_id, human_category_id, lang_id } =
        createEventDto;

        await this.findOneEventByName(name);


      const fileName = await this.fileService.createFile(photo);

      
      const data = {
        ...createEventDto,
        event_type_id: Number(event_type_id),
        venue_id: Number(venue_id),
        lang_id: Number(lang_id),
        human_category_id: Number(human_category_id),
      };
      const event = await this.eventRepository.create({
        ...data,
        photo: fileName,
      });

      return event;
    } catch (error) {
      throw new NotFoundException('ForegnKey not avialable');
    }
  }

  async findAll() {
    const events = await this.eventRepository.findAll({
      include: { all: true },
    });
    return events;
  }

  async findOneEventById(id: number) {
    const event = await this.eventRepository.findByPk(id);
    if (!event) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }

  async updateEventByID(id: number, updateEventDto: UpdateEventDto) {
    await this.findOneEventById(id);

    const event = await this.eventRepository.update(updateEventDto, {
      where: { id },
      returning: true,
    });
    return event[1][0];
  }

  async removeEventById(id: number) {
    await this.findOneEventById(id);
    await this.eventRepository.destroy({ where: { id } });

    return id;
  }

  private async findOneEventByName(name: string) {
    const event = await this.eventRepository.findOne({ where: { name } });
    if (event) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return event;
  }
}
