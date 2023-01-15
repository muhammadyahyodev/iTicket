import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateGenderDto } from './dto';
import { Gender } from './Schemas/gender.model';

@Injectable()
export class GenderService {
  constructor(
    @InjectModel(Gender) private readonly genderRepository: typeof Gender,
  ) {}

  async addGender(createGenderDto: CreateGenderDto) {
    const { gender } = createGenderDto;
    await this.findGenderByName(gender);

    const add = await this.genderRepository.create(createGenderDto);
    return add;
  }

  async findAll() {
    const genders = await this.genderRepository.findAll({
      include: { all: true },
    });
    return genders;
  }

  async findGenderById(id: number) {
    const gender = await this.genderRepository.findByPk(id);
    return gender;
  }

  private async findGenderByName(name: string) {
    const gender = await this.genderRepository.findOne({
      where: { gender: name },
    });
    if (gender) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
  }
}
