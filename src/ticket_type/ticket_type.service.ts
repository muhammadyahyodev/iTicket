import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketTypeDto } from './dto/create-ticket_type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket_type.dto';
import { TicketType } from './Schemas/ticket_type.model';

@Injectable()
export class TicketTypeService {
  constructor(
    @InjectModel(TicketType)
    private readonly ticketTypeRepository: typeof TicketType,
  ) {}

  async createTicketType(createTicketTypeDto: CreateTicketTypeDto) {
    const { name } = createTicketTypeDto;
    await this.findTicketTypeByName(name);

    const ticketType = await this.ticketTypeRepository.create(
      createTicketTypeDto,
    );

    return ticketType;
  }

  async findAll() {
    const ticketType = await this.ticketTypeRepository.findAll({
      include: { all: true },
    });
    return ticketType;
  }

  async findTicketTypeById(id: number) {
    const ticketType = await this.ticketTypeRepository.findByPk(id);
    if (!ticketType) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return ticketType;
  }

  async updateTicketTypeById(
    id: number,
    updateTicketTypeDto: UpdateTicketTypeDto,
  ) {
    await this.findTicketTypeById(id);

    const ticketType = await this.ticketTypeRepository.update(
      updateTicketTypeDto,
      { where: { id }, returning: true },
    );

    return ticketType;
  }

  async removeTicketTypeById(id: number) {
    await this.findTicketTypeById(id);
    await this.ticketTypeRepository.destroy({ where: { id } });

    return id;
  }

  private async findTicketTypeByName(name: string) {
    const ticketType = await this.ticketTypeRepository.findOne({
      where: { name },
    });
    if (ticketType) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return ticketType;
  }
}
