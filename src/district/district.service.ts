import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from 'src/region/Schemas/region.model';
import { CreateDistrictDto, UpdateDistrictDto } from './dto';
import { District } from './Schemas/district.model';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District) private readonly districtRepository: typeof District,
    @InjectModel(Region) private readonly region: typeof Region,
  ) {}

  async createDistrict(createDistrictDto: CreateDistrictDto) {
    const { name } = createDistrictDto;
    await this.findDistrictByName(name);

    const district = await this.districtRepository.create(createDistrictDto);

    return district;
  }

  async findAll() {
    const districts = await this.districtRepository.findAll();
    return districts;
  }

  async findOneDistrictById(id: number) {
    const district = await this.districtRepository.findByPk(id);
    if (!district) {
      throw new HttpException('Not found ', HttpStatus.NOT_FOUND);
    }
    return district;
  }

  async updateDistrictById(id: number, updateDistrictDto: UpdateDistrictDto) {
    await this.findOneDistrictById(id);

    const district = await this.districtRepository.update(updateDistrictDto, {
      where: { id },
      returning: true,
    });

    return district;
  }

  async removeDistrictById(id: number) {
    await this.findOneDistrictById(id);
    await this.districtRepository.destroy({ where: { id } });

    return id;
  }

  private async findDistrictByName(name: string) {
    const distriict = await this.districtRepository.findOne({
      where: { name },
    });
    if (distriict) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return distriict;
  }
}
