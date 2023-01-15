import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HumanCategoryService } from './human_category.service';
import { CreateHumanCategoryDto } from './dto/create-human_category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human_category.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HumanCategory } from './Schemas/human_category.model';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Human category')
@Controller('human-category')
export class HumanCategoryController {
  constructor(private readonly humanCategoryService: HumanCategoryService) {}

  @ApiOperation({ summary: 'create human category' })
  @ApiResponse({ status: 200, type: [HumanCategory] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createHumanCategoryDto: CreateHumanCategoryDto) {
    return this.humanCategoryService.createHumanCategory(
      createHumanCategoryDto,
    );
  }

  @ApiOperation({ summary: 'get humans category' })
  @ApiResponse({ status: 200, type: [HumanCategory] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Get()
  findAll() {
    return this.humanCategoryService.findAll();
  }

  @ApiOperation({ summary: 'get human category by id' })
  @ApiResponse({ status: 200, type: [HumanCategory] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humanCategoryService.findOneHumanCategoryById(+id);
  }

  @ApiOperation({ summary: 'update human category by id' })
  @ApiResponse({ status: 200, type: [HumanCategory] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHumanCategoryDto: UpdateHumanCategoryDto,
  ) {
    return this.humanCategoryService.updateHumanCategoryById(
      +id,
      updateHumanCategoryDto,
    );
  }

  @ApiOperation({ summary: 'delete human category by id' })
  @ApiResponse({ status: 200, type: [HumanCategory] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humanCategoryService.removeHumanCategoryById(+id);
  }
}
