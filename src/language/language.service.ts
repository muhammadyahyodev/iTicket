import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from './Schemas/language.model';

@Injectable()
export class LanguageService {
  constructor(
    @InjectModel(Language) private readonly languageRepository: typeof Language,
  ) {}

  async createLang(createLanguageDto: CreateLanguageDto) {
    const { language } = createLanguageDto;
    await this.findLanguageByName(language);

    const lang = await this.languageRepository.create(createLanguageDto);

    return lang;
  }

  async findAll() {
    const languages = await this.languageRepository.findAll({
      include: { all: true },
    });
    return languages;
  }

  async findLangById(id: number) {
    const lang = await this.languageRepository.findByPk(id);
    if (!lang) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return lang;
  }

  async updateLanguageById(id: number, updateLanguageDto: UpdateLanguageDto) {
    await this.findLangById(id);

    const lang = await this.languageRepository.update(updateLanguageDto, {
      where: { id },
      returning: true,
    });

    return lang;
  }

  async removeLangById(id: number) {
    await this.findLangById(id);
    await this.languageRepository.destroy({ where: { id } });

    return id;
  }

  private async findLanguageByName(lang: string) {
    const language = await this.languageRepository.findOne({
      where: { language: lang },
    });

    if (language) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return language;
  }
}
