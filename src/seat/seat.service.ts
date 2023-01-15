import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './Schemas/seat.model';

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat) private readonly seatRepository: typeof Seat,
  ) {}

  async createSeat(createSeatDto: CreateSeatDto) {
    const { sector } = createSeatDto;
    await this.findOneSeatBySector(sector);

    const seat = await this.seatRepository.create(createSeatDto);
    return seat;
  }

  async findAll() {
    const seats = await this.seatRepository.findAll({ include: { all: true } });
    return seats;
  }

  async findOneSeatById(id: number) {
    const seat = await this.seatRepository.findByPk(id);
    if (!seat) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return seat;
  }

  async updateSeatById(id: number, updateSeatDto: UpdateSeatDto) {
    await this.findOneSeatById(id);

    const seat = await this.seatRepository.update(updateSeatDto, {
      where: { id },
      returning: true,
    });
    return seat[1][0];
  }

  async removeSeatById(id: number) {
    await this.findOneSeatById(id);
    await this.seatRepository.destroy({ where: { id } });

    return id;
  }

  private async findOneSeatBySector(sector: string) {
    const seat = await this.seatRepository.findOne({ where: { sector } });
    if (seat) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return seat;
  }
}
