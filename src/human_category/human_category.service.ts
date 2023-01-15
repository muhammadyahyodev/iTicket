import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Gender } from 'src/gender/Schemas/gender.model';
import { CreateHumanCategoryDto } from './dto/create-human_category.dto';
import { UpdateHumanCategoryDto } from './dto/update-human_category.dto';
import { HumanCategory } from './Schemas/human_category.model';

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory)
    private readonly humanCategoryRepository: typeof HumanCategory,
    @InjectModel(Gender) private readonly gender: typeof Gender,
  ) {}

  async createHumanCategory(createHumanCategoryDto: CreateHumanCategoryDto) {
    const { name, gender_id } = createHumanCategoryDto;
    await this.findHumanCategoryByName(name);

    const gender = await this.gender.findByPk(gender_id);

    if (!gender) {
      throw new HttpException('ForegnKey not avialable', HttpStatus.NOT_FOUND);
    }

    const humanCategory = await this.humanCategoryRepository.create(
      createHumanCategoryDto,
    );
    return humanCategory;
  }

  async findAll() {
    const humanCategories = await this.humanCategoryRepository.findAll({
      include: { all: true },
    });
    return humanCategories;
  }

  async findOneHumanCategoryById(id: number) {
    const humanCategory = await this.humanCategoryRepository.findByPk(id);
    if (!humanCategory) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return humanCategory;
  }

  async updateHumanCategoryById(
    id: number,
    updateHumanCategoryDto: UpdateHumanCategoryDto,
  ) {
    await this.findOneHumanCategoryById(id);

    const humanCategory = await this.humanCategoryRepository.update(
      updateHumanCategoryDto,
      { where: { id }, returning: true },
    );
    return humanCategory;
  }

  async removeHumanCategoryById(id: number) {
    await this.findOneHumanCategoryById(id);
    await this.humanCategoryRepository.destroy({ where: { id } });
    return id;
  }

  private async findHumanCategoryByName(name: string) {
    const humanCategory = await this.humanCategoryRepository.findOne({
      where: { name },
    });
    if (humanCategory) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return humanCategory;
  }
}
