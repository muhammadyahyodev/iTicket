import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GenderService } from './gender.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateGenderDto } from './dto';
import { Gender } from './Schemas/gender.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Gender')
@Controller('gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @ApiOperation({ summary: 'create gender' })
  @ApiResponse({ status: 200, type: [Gender] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genderService.addGender(createGenderDto);
  }

  @ApiOperation({ summary: 'get genders' })
  @ApiResponse({ status: 200, type: [Gender] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.genderService.findAll();
  }
}
