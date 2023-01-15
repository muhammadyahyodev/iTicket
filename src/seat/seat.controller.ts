import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Seat } from './Schemas/seat.model';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Seat')
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @ApiOperation({ summary: 'create seat' })
  @ApiResponse({ status: 200, type: [Seat] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.createSeat(createSeatDto);
  }

  @ApiOperation({ summary: 'get seats' })
  @ApiResponse({ status: 200, type: [Seat] })
  @Get()
  findAll() {
    return this.seatService.findAll();
  }

  @ApiOperation({ summary: 'get seat by id' })
  @ApiResponse({ status: 200, type: [Seat] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatService.findOneSeatById(+id);
  }

  @ApiOperation({ summary: 'update seat by id' })
  @ApiResponse({ status: 200, type: [Seat] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.updateSeatById(+id, updateSeatDto);
  }

  @ApiOperation({ summary: 'delete seat by id' })
  @ApiResponse({ status: 200, type: [Seat] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatService.removeSeatById(+id);
  }
}
