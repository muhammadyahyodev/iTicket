import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookingDto, UpdateBookingDto } from './dto';
import { Booking } from './Schemas/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private readonly bookingRepository: typeof Booking,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto) {
    console.log(createBookingDto);
    const booking = await this.bookingRepository.create(createBookingDto);
    return booking;
  }

  async findAll() {
    const booking = await this.bookingRepository.findAll({
      include: { all: true },
    });
    return booking;
  }

  async findBookingById(id: number) {
    const booking = await this.bookingRepository.findByPk(id);
    if (!booking) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return booking;
  }

  async updateBookingById(id: number, updateBookingDto: UpdateBookingDto) {
    await this.findBookingById(id);

    const booking = await this.bookingRepository.update(updateBookingDto, {
      where: { id },
      returning: true,
    });

    return booking;
  }

  async removeBookingById(id: number) {
    await this.findBookingById(id);
    await this.bookingRepository.destroy({ where: { id } });

    return id;
  }
}
