import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVenueTypeDto, UpdateVenueTypeDto } from './dto';
import { VenueType } from './Schemas/venue_type.model';

@Injectable()
export class VenueTypeService {
  constructor(
    @InjectModel(VenueType)
    private readonly venueTypeRepository: typeof VenueType,
  ) {}

  async createVenueType(createVenueTypeDto: CreateVenueTypeDto) {
    const { name } = createVenueTypeDto;
    const c = await this.findVenueTypeByName(name);
    const venueType = await this.venueTypeRepository.create(createVenueTypeDto);
    return venueType;
  }

  async findAllVenueTypes() {
    const venueTypes = await this.venueTypeRepository.findAll({
      include: { all: true },
    });
    return venueTypes;
  }

  async findOneVenueTypeById(id: number) {
    const venueType = await this.venueTypeRepository.findByPk(id);

    if (!venueType) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return venueType;
  }

  async updateVenueTypeById(
    id: number,
    updateVenueTypeDto: UpdateVenueTypeDto,
  ) {
    await this.findOneVenueTypeById(id);

    const venueType = await this.venueTypeRepository.update(
      updateVenueTypeDto,
      { where: { id }, returning: true },
    );

    return venueType[1][0];
  }

  async removeVenueTypeById(id: number) {
    await this.findOneVenueTypeById(id);
    await this.venueTypeRepository.destroy({ where: { id } });

    return id;
  }

  async findVenueTypeByName(name: string) {
    const venueType = await this.venueTypeRepository.findOne({
      where: { name },
    });

    if (venueType) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }

    return venueType;
  }
}
