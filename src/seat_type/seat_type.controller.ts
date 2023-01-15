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
import { SeatTypeService } from './seat_type.service';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { SeatType } from './Schemas/seat_type.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Seat type')
@Controller('seat-type')
export class SeatTypeController {
  constructor(private readonly seatTypeService: SeatTypeService) {}

  @ApiOperation({ summary: 'create seat type' })
  @ApiResponse({ status: 200, type: [SeatType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypeService.createSeatType(createSeatTypeDto);
  }

  @ApiOperation({ summary: 'get seat types' })
  @ApiResponse({ status: 200, type: [SeatType] })
  @Get()
  findAll() {
    return this.seatTypeService.findAll();
  }

  @ApiOperation({ summary: 'get seat type by id' })
  @ApiResponse({ status: 200, type: [SeatType] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatTypeService.findOneSeatTypeById(+id);
  }

  @ApiOperation({ summary: 'update seat type by id' })
  @ApiResponse({ status: 200, type: [SeatType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSeatTypeDto: UpdateSeatTypeDto,
  ) {
    return this.seatTypeService.updateSeatTypeById(+id, updateSeatTypeDto);
  }

  @ApiOperation({ summary: 'delete seat type by id' })
  @ApiResponse({ status: 200, type: [SeatType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatTypeService.removeSeatTypeById(+id);
  }
}
