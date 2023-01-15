import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from 'src/event/Schemas/event.model';
import { Seat } from 'src/seat/Schemas/seat.model';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './Schemas/ticket.model';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket) private readonly ticketRepository: typeof Ticket,
    @InjectModel(Event) private readonly event: typeof Event,
    @InjectModel(Seat) private readonly seat: typeof Seat,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto) {
    const ticket = await this.ticketRepository.create(createTicketDto);
    return ticket;
  }

  async findAll() {
    const tickets = await this.ticketRepository.findAll({
      include: { all: true },
    });
    return tickets;
  }

  async findOneTicketById(id: number) {
    const ticket = await this.ticketRepository.findByPk(id);
    if (!ticket) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return ticket;
  }

  async updateTicketById(id: number, updateTicketDto: UpdateTicketDto) {
    await this.findOneTicketById(id);

    const ticket = await this.ticketRepository.update(updateTicketDto, {
      where: { id },
      returning: true,
    });
    return ticket[1][0];
  }

  async removeTicketById(id: number) {
    await this.findOneTicketById(id);
    await this.ticketRepository.destroy({ where: { id } });

    return id;
  }
}
