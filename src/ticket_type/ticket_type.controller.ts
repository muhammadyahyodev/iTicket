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
import { TicketTypeService } from './ticket_type.service';
import { CreateTicketTypeDto } from './dto/create-ticket_type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket_type.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { TicketType } from './Schemas/ticket_type.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Ticket type')
@Controller('ticket-type')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @ApiOperation({ summary: 'create ticket type' })
  @ApiResponse({ status: 200, type: [TicketType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createTicketTypeDto: CreateTicketTypeDto) {
    return this.ticketTypeService.createTicketType(createTicketTypeDto);
  }

  @ApiOperation({ summary: 'get ticket type' })
  @ApiResponse({ status: 200, type: [TicketType] })
  @Get()
  findAll() {
    return this.ticketTypeService.findAll();
  }

  @ApiOperation({ summary: 'get ticket type by id' })
  @ApiResponse({ status: 200, type: [TicketType] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketTypeService.findTicketTypeById(+id);
  }

  @ApiOperation({ summary: 'update ticket type by id' })
  @ApiResponse({ status: 200, type: [TicketType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketTypeDto: UpdateTicketTypeDto,
  ) {
    return this.ticketTypeService.updateTicketTypeById(
      +id,
      updateTicketTypeDto,
    );
  }

  @ApiOperation({ summary: 'delete ticket type by id' })
  @ApiResponse({ status: 200, type: [TicketType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketTypeService.removeTicketTypeById(+id);
  }
}
