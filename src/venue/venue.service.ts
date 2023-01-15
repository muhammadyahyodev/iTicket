import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { District } from 'src/district/Schemas/district.model';
import { Region } from 'src/region/Schemas/region.model';
import { VenueType } from 'src/venue_type/Schemas/venue_type.model';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { Venue } from './Schemas/venue.model';

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue) private readonly venueRepository: typeof Venue,
    @InjectModel(VenueType) private readonly venuetype: typeof VenueType,
    @InjectModel(Region) private readonly region: typeof Region,
    @InjectModel(District) private readonly disctrict: typeof District,
  ) {}

  async createVenue(createVenueDto: CreateVenueDto) {
    const { name } = createVenueDto;
    await this.findVenueByName(name);
    const venue = await this.venueRepository.create(createVenueDto);
    return venue;
  }

  async findAll() {
    const venues = await this.venueRepository.findAll();
    return venues;
  }

  async findOneVenueById(id: number) {
    const venue = await this.venueRepository.findByPk(id);
    if (!venue) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return venue;
  }

  async updateVenueById(id: number, updateVenueDto: UpdateVenueDto) {
    await this.findOneVenueById(id);

    const venue = await this.venueRepository.update(updateVenueDto, {
      where: { id },
      returning: true,
    });

    return venue[1][0];
  }

  async removeVenueById(id: number) {
    await this.findOneVenueById(id);
    await this.venueRepository.destroy({ where: { id } });
    return id;
  }

  private async findVenueByName(name: string) {
    const venue = await this.venueRepository.findOne({ where: { name } });
    if (venue) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return venue;
  }
}
