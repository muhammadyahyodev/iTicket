import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Event } from './Schemas/event.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { GuardForAll } from 'src/guards/all.guard';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'create event' })
  @ApiResponse({ status: 200, type: [Event] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(@Body() createEventDto: CreateEventDto, @UploadedFile() photo) {
    return this.eventService.createEvent(createEventDto, photo);
  }

  @ApiOperation({ summary: 'get events' })
  @ApiResponse({ status: 200, type: [Event] })
  @ApiBearerAuth()
  @UseGuards(GuardForAll)
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @ApiOperation({ summary: 'get event by id' })
  @ApiResponse({ status: 200, type: [Event] })
  @ApiBearerAuth()
  @UseGuards(GuardForAll)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOneEventById(+id);
  }

  @ApiOperation({ summary: 'update event by id' })
  @ApiResponse({ status: 200, type: [Event] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEventByID(+id, updateEventDto);
  }

  @ApiOperation({ summary: 'delete event by id' })
  @ApiResponse({ status: 200, type: [Event] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.removeEventById(+id);
  }
}
