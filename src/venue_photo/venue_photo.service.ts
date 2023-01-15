import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { url } from 'inspector';
import { Venue } from 'src/venue/Schemas/venue.model';
import { CreateVenuePhotoDto } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';
import { VenuePhoto } from './Schemas/venue_photo.model';

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(VenuePhoto)
    private readonly venuePhotoRepository: typeof VenuePhoto,
    @InjectModel(Venue)
    private readonly venue: typeof Venue,
  ) {}

  async createVenuePhoto(createVenuePhotoDto: CreateVenuePhotoDto) {
    const { url } = createVenuePhotoDto;
    await this.findVenuePhotoByUrl(url);

    const venue = await this.venue.findByPk(createVenuePhotoDto.venue_id);

    if (!venue) {
      throw new HttpException('ForegnKey not avialable', HttpStatus.NOT_FOUND);
    }

    const venuePhoto = await this.venuePhotoRepository.create(
      createVenuePhotoDto,
    );

    return venuePhoto;
  }

  async findAll() {
    const venuePhotos = await this.venuePhotoRepository.findAll({
      include: { all: true },
    });
    return venuePhotos;
  }

  async findOneVenuePhotoById(id: number) {
    const venuePhoto = await this.venuePhotoRepository.findByPk(id);
    if (!venuePhoto) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return venuePhoto;
  }

  async updateVenuePhotoById(
    id: number,
    updateVenuePhotoDto: UpdateVenuePhotoDto,
  ) {
    await this.findOneVenuePhotoById(id);

    const venuePhoto = await this.venuePhotoRepository.update(
      updateVenuePhotoDto,
      { where: { id }, returning: true },
    );

    return venuePhoto[1][0];
  }

  async removeVenuePhotoById(id: number) {
    await this.findOneVenuePhotoById(id);
    await this.venuePhotoRepository.destroy({ where: { id } });
    return id;
  }

  private async findVenuePhotoByUrl(url: string) {
    const venuePhoto = await this.venuePhotoRepository.findOne({
      where: { url },
    });
    if (venuePhoto) {
      throw new HttpException(
        { reason: 'Already exists' },
        HttpStatus.FORBIDDEN,
      );
    }
    return venuePhoto;
  }
}
