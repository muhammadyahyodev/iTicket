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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GuardForAll } from 'src/guards/all.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { DistrictService } from './district.service';
import { CreateDistrictDto, UpdateDistrictDto } from './dto';
import { District } from './Schemas/district.model';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'create district' })
  @ApiResponse({ status: 200, type: [District] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.createDistrict(createDistrictDto);
  }

  @ApiOperation({ summary: 'get all district' })
  @ApiResponse({ status: 200, type: [District] })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: 'get district by id' })
  @ApiResponse({ status: 200, type: [District] })
  @ApiBearerAuth()
  @UseGuards(GuardForAll)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOneDistrictById(+id);
  }

  @ApiOperation({ summary: 'update district by id' })
  @ApiResponse({ status: 200, type: [District] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.updateDistrictById(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: 'delete district by id' })
  @ApiResponse({ status: 200, type: [District] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.removeDistrictById(+id);
  }
}
