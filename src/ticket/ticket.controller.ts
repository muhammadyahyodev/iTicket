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
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { Ticket } from './Schemas/ticket.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'Create ticket' })
  @ApiResponse({ status: 200, type: [Ticket] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }

  @ApiOperation({ summary: 'Get all ticket' })
  @ApiResponse({ status: 200, type: [Ticket] })
  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @ApiOperation({ summary: 'Get one ticket by id' })
  @ApiResponse({ status: 200, type: [Ticket] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOneTicketById(+id);
  }

  @ApiOperation({ summary: 'Update ticket by id' })
  @ApiResponse({ status: 200, type: [Ticket] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.updateTicketById(+id, updateTicketDto);
  }

  @ApiOperation({ summary: 'Remove ticket by id' })
  @ApiResponse({ status: 200, type: [Ticket] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.removeTicketById(+id);
  }
}
