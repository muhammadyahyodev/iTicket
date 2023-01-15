import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { VenuePhotoService } from './venue_photo.service';
import { VenuePhoto } from './Schemas/venue_photo.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateVenuePhotoDto, UpdateVenuePhotoDto } from './dto';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Venue photo')
@Controller('venue-photo')
export class VenuePhotoController {
  constructor(private readonly venuePhotoService: VenuePhotoService) {}

  @ApiOperation({ summary: 'create venue photo' })
  @ApiResponse({ status: 200, type: [VenuePhoto] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post('add')
  create(@Body() createVenuePhotoDto: CreateVenuePhotoDto) {
    return this.venuePhotoService.createVenuePhoto(createVenuePhotoDto);
  }

  @ApiOperation({ summary: 'get venue photos' })
  @ApiResponse({ status: 200, type: [VenuePhoto] })
  @Get()
  findAll() {
    return this.venuePhotoService.findAll();
  }

  @ApiOperation({ summary: 'get venue photo by id' })
  @ApiResponse({ status: 200, type: [VenuePhoto] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuePhotoService.findOneVenuePhotoById(+id);
  }

  @ApiOperation({ summary: 'update venue photo by id' })
  @ApiResponse({ status: 200, type: [VenuePhoto] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateVenuePhotoDto: UpdateVenuePhotoDto,
  ) {
    return this.venuePhotoService.updateVenuePhotoById(
      +id,
      updateVenuePhotoDto,
    );
  }

  @ApiOperation({ summary: 'delete venue photo by id' })
  @ApiResponse({ status: 200, type: [VenuePhoto] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.venuePhotoService.removeVenuePhotoById(+id);
  }
}
