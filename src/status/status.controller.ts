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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { CreateStatusDto, UpdateStatusDto } from './dto';
import { Status } from './Schemas/status.model';
import { StatusService } from './status.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'create status type' })
  @ApiResponse({ status: 200, type: [Status] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.createStatus(createStatusDto);
  }

  @ApiOperation({ summary: 'get status types' })
  @ApiResponse({ status: 200, type: [Status] })
  @Get()
  findAll() {
    return this.statusService.findAll();
  }

  @ApiOperation({ summary: 'get status type by id' })
  @ApiResponse({ status: 200, type: [Status] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findStatusById(+id);
  }

  @ApiOperation({ summary: 'update status type by id' })
  @ApiResponse({ status: 200, type: [Status] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.updateStatusById(+id, updateStatusDto);
  }

  @ApiOperation({ summary: 'delete status type by id' })
  @ApiResponse({ status: 200, type: [Status] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusService.removeStatusByID(+id);
  }
}
