import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { CreateEventTypeDto, UpdateEventTypeDto } from './dto';
import { EventTypeService } from './event_type.service';
import { EventType } from './Schemas/event_type.model';

@ApiTags('Event type')
@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @ApiOperation({ summary: 'create event type' })
  @ApiResponse({ status: 200, type: [EventType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeService.createEventType(createEventTypeDto);
  }

  @ApiOperation({ summary: 'get all event type' })
  @ApiResponse({ status: 200, type: [EventType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Get()
  findAll() {
    return this.eventTypeService.findAll();
  }

  @ApiOperation({ summary: 'get event type by id' })
  @ApiResponse({ status: 200, type: [EventType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTypeService.findOneEventTypeById(+id);
  }

  @ApiOperation({ summary: 'update event type by id' })
  @ApiResponse({ status: 200, type: [EventType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
  ) {
    return this.eventTypeService.updateEventTypeById(+id, updateEventTypeDto);
  }

  @ApiOperation({ summary: 'delete event type by id' })
  @ApiResponse({ status: 200, type: [EventType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTypeService.removeEventTypeById(+id);
  }
}
