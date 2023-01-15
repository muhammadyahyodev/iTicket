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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto';
import { Country } from './Schemas/country.model';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiOperation({ summary: 'create country' })
  @ApiResponse({ status: 200, type: [Country] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.createCountry(createCountryDto);
  }

  @ApiOperation({ summary: 'get all country' })
  @ApiResponse({ status: 200, type: [Country] })
  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @ApiOperation({ summary: 'get country by id' })
  @ApiResponse({ status: 200, type: [Country] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findCountryById(+id);
  }

  @ApiOperation({ summary: 'delete country by id' })
  @ApiResponse({ status: 200, type: [Country] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.removeCountryById(+id);
  }
}
