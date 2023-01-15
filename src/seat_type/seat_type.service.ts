import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { SeatType } from './Schemas/seat_type.model';

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(SeatType) private readonly seatTypeRepository: typeof SeatType,
  ) {}

  async createSeatType(createSeatTypeDto: CreateSeatTypeDto) {
    const { name } = createSeatTypeDto;
    await this.findSeatTypeByName(name);

    const seatType = await this.seatTypeRepository.create(createSeatTypeDto);
    return seatType;
  }

  async findAll() {
    const seatType = await this.seatTypeRepository.findAll();
    return seatType;
  }

  async findOneSeatTypeById(id: number) {
    const seatType = await this.seatTypeRepository.findByPk(id);
    if (!seatType) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return seatType;
  }

  async updateSeatTypeById(id: number, updateSeatTypeDto: UpdateSeatTypeDto) {
    await this.findOneSeatTypeById(id);

    const seatType = await this.seatTypeRepository.update(updateSeatTypeDto, {
      where: { id },
      returning: true,
    });
    return seatType;
  }

  async removeSeatTypeById(id: number) {
    await this.findOneSeatTypeById(id);
    await this.seatTypeRepository.destroy({ where: { id } });
    return id;
  }

  private async findSeatTypeByName(name: string) {
    const seatType = await this.seatTypeRepository.findOne({ where: { name } });
    if (seatType) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return seatType;
  }
}
