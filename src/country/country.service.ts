import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCountryDto } from './dto';
import { Country } from './Schemas/country.model';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country) private readonly countryRepository: typeof Country,
  ) {}

  async createCountry(createCountryDto: CreateCountryDto) {
    const { name } = createCountryDto;
    await this.findCountryByName(name);

    const country = await this.countryRepository.create(createCountryDto);
    return country;
  }

  async findAll() {
    const countries = await this.countryRepository.findAll({
      include: { all: true },
    });
    return countries;
  }

  async findCountryById(id: number) {
    const country = await this.countryRepository.findByPk(id);
    if (!country) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return country;
  }

  async removeCountryById(id: number) {
    await this.findCountryById(id);
    await this.countryRepository.destroy({ where: { id } });

    return id;
  }

  private async findCountryByName(name: string) {
    const country = await this.countryRepository.findOne({ where: { name } });
    if (country) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return country;
  }
}
