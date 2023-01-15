import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { Venue } from './Schemas/venue.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Venue')
@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @ApiOperation({ summary: 'create venue' })
  @ApiResponse({ status: 200, type: [Venue] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post('add')
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.createVenue(createVenueDto);
  }

  @ApiOperation({ summary: 'get venues' })
  @ApiResponse({ status: 200, type: [Venue] })
  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @ApiOperation({ summary: 'get venue by id' })
  @ApiResponse({ status: 200, type: [Venue] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOneVenueById(+id);
  }

  @ApiOperation({ summary: 'update venue by id' })
  @ApiResponse({ status: 200, type: [Venue] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.updateVenueById(+id, updateVenueDto);
  }

  @ApiOperation({ summary: 'delete venue by id' })
  @ApiResponse({ status: 200, type: [Venue] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.venueService.removeVenueById(+id);
  }
}
