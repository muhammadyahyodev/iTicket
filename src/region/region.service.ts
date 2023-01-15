import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto, UpdateRegionDto } from './dto';
import { Region } from './Schemas/region.model';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region) private readonly regionRepository: typeof Region,
  ) {}

  async createRegion(createRegionDto: CreateRegionDto) {
    const { name } = createRegionDto;
    await this.findRegionByName(name);

    const region = await this.regionRepository.create(createRegionDto);
    return region;
  }

  async findAll() {
    const regions = await this.regionRepository.findAll({
      include: { all: true },
    });
    return regions;
  }

  async findOneRegionById(id: number) {
    const region = await this.regionRepository.findByPk(id);
    if (!region) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return region;
  }

  async updateRegionById(id: number, updateRegionDto: UpdateRegionDto) {
    await this.findOneRegionById(id);

    const region = await this.regionRepository.update(updateRegionDto, {
      where: { id },
      returning: true,
    });

    return region[1][0];
  }

  async removeRegionByID(id: number) {
    await this.findOneRegionById(id);
    await this.regionRepository.destroy({ where: { id } });
    return id;
  }

  private async findRegionByName(name: string) {
    const region = await this.regionRepository.findOne({ where: { name } });
    if (region) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return region;
  }
}
