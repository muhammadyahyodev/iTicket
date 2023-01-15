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
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { Language } from './Schemas/language.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @ApiOperation({ summary: 'add language' })
  @ApiResponse({ status: 200, type: [Language] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.createLang(createLanguageDto);
  }

  @ApiOperation({ summary: 'get languagies' })
  @ApiResponse({ status: 200, type: [Language] })
  @Get()
  async findAll() {
    const languages = await this.languageService.findAll();
    return languages;
  }

  @ApiOperation({ summary: 'get language by id' })
  @ApiResponse({ status: 200, type: [Language] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findLangById(+id);
  }

  @ApiOperation({ summary: 'update language by id' })
  @ApiResponse({ status: 200, type: [Language] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.updateLanguageById(+id, updateLanguageDto);
  }

  @ApiOperation({ summary: 'delete language by id' })
  @ApiResponse({ status: 200, type: [Language] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.removeLangById(+id);
  }
}
