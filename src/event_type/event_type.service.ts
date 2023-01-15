import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventTypeDto } from './dto/create-event_type.dto';
import { UpdateEventTypeDto } from './dto/update-event_type.dto';
import { EventType } from './Schemas/event_type.model';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EventType)
    private readonly eventTypeRepository: typeof EventType,
  ) {}

  async createEventType(createEventTypeDto: CreateEventTypeDto) {
    const { name } = createEventTypeDto;
    await this.findEventTypeByName(name);

    const eventType = await this.eventTypeRepository.create(createEventTypeDto);
    return eventType;
  }

  async findAll() {
    const eventTypes = await this.eventTypeRepository.findAll();
    return eventTypes;
  }

  async findOneEventTypeById(id: number) {
    const eventType = await this.eventTypeRepository.findByPk(id);
    if (!eventType) {
      throw new HttpException('Not found ', HttpStatus.NOT_FOUND);
    }
    return eventType;
  }

  async updateEventTypeById(
    id: number,
    updateEventTypeDto: UpdateEventTypeDto,
  ) {
    await this.findOneEventTypeById(id);

    const eventType = await this.eventTypeRepository.update(
      updateEventTypeDto,
      { where: { id }, returning: true },
    );
    return eventType;
  }

  async removeEventTypeById(id: number) {
    await this.findOneEventTypeById(id);
    await this.eventTypeRepository.destroy({ where: { id } });
    return id;
  }

  private async findEventTypeByName(name: string) {
    const eventType = await this.eventTypeRepository.findOne({
      where: { name },
    });
    if (eventType) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return eventType;
  }
}
