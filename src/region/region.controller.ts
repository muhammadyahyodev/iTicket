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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Region } from './Schemas/region.model';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'create region' })
  @ApiResponse({ status: 200, type: [Region] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post('add')
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.createRegion(createRegionDto);
  }

  @ApiOperation({ summary: 'get regions' })
  @ApiResponse({ status: 200, type: [Region] })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'get region by id' })
  @ApiResponse({ status: 200, type: [Region] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOneRegionById(+id);
  }

  @ApiOperation({ summary: 'update region by id' })
  @ApiResponse({ status: 200, type: [Region] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.updateRegionById(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'delete region by id' })
  @ApiResponse({ status: 200, type: [Region] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.regionService.removeRegionByID(+id);
  }
}
