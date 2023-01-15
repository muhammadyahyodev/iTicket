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
import { VenueTypeService } from './venue_type.service';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { VenueType } from './Schemas/venue_type.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Venue type')
@Controller('venue-type')
export class VenueTypeController {
  constructor(private readonly venueTypeService: VenueTypeService) {}

  @ApiOperation({ summary: 'create venue type' })
  @ApiResponse({ status: 200, type: [VenueType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post('add')
  create(@Body() createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypeService.createVenueType(createVenueTypeDto);
  }

  @ApiOperation({ summary: 'get venue types' })
  @ApiResponse({ status: 200, type: [VenueType] })
  @Get()
  findAll() {
    return this.venueTypeService.findAllVenueTypes();
  }

  @ApiOperation({ summary: 'get venue type by id' })
  @ApiResponse({ status: 200, type: [VenueType] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueTypeService.findOneVenueTypeById(+id);
  }

  @ApiOperation({ summary: 'update venue type by id' })
  @ApiResponse({ status: 200, type: [VenueType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateVenueTypeDto: UpdateVenueTypeDto,
  ) {
    return this.venueTypeService.updateVenueTypeById(+id, updateVenueTypeDto);
  }

  @ApiOperation({ summary: 'delete venue type by id' })
  @ApiResponse({ status: 200, type: [VenueType] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.venueTypeService.removeVenueTypeById(+id);
  }
}
