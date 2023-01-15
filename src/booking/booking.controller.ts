import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto';
import { Booking } from './Schemas/booking.model';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'create booking' })
  @ApiResponse({ status: 200, type: [Booking] })
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(createBookingDto);
  }

  @ApiOperation({ summary: 'get all bookings' })
  @ApiResponse({ status: 200, type: [Booking] })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @ApiOperation({ summary: 'get booking by id' })
  @ApiResponse({ status: 200, type: [Booking] })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findBookingById(+id);
  }

  @ApiOperation({ summary: 'delete booking' })
  @ApiResponse({ status: 200, type: [Booking] })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.removeBookingById(+id);
  }
}
