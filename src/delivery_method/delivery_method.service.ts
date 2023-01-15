import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDeliveryMethodDto } from './dto/create-delivery_method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery_method.dto';
import { DeliveryMethod } from './Schemas/delivery_method.model';

@Injectable()
export class DeliveryMethodService {
  constructor(
    @InjectModel(DeliveryMethod)
    private readonly deliveryMethodRepository: typeof DeliveryMethod,
  ) {}

  async createDeliveryMethod(createDeliveryMethodDto: CreateDeliveryMethodDto) {
    const { name } = createDeliveryMethodDto;
    await this.findDeliveryMethodByName(name);

    const deliveryMethod = await this.deliveryMethodRepository.create(
      createDeliveryMethodDto,
    );

    return deliveryMethod;
  }

  async findAll() {
    const deliveryMethod = await this.deliveryMethodRepository.findAll({
      include: { all: true },
    });
    return deliveryMethod;
  }

  async findDeliveryMethodById(id: number) {
    const deliveryMethod = await this.deliveryMethodRepository.findByPk(id);
    if (!deliveryMethod) {
      throw new HttpException(
        'Delevery method not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return deliveryMethod;
  }

  async updateDeliveryMethodById(
    id: number,
    updateDeliveryMethodDto: UpdateDeliveryMethodDto,
  ) {
    await this.findDeliveryMethodById(id);

    const deliveryMethod = await this.deliveryMethodRepository.update(
      updateDeliveryMethodDto,
      { where: { id }, returning: true },
    );
    return deliveryMethod[1][0];
  }

  async removeDeliveryMethodById(id: number) {
    await this.findDeliveryMethodById(id);
    await this.deliveryMethodRepository.destroy({ where: { id } });

    return id;
  }

  private async findDeliveryMethodByName(name: string) {
    const deliveryMethod = await this.deliveryMethodRepository.findOne({
      where: { name },
    });
    if (deliveryMethod) {
      throw new HttpException('Already exists', HttpStatus.NOT_FOUND);
    }
    return deliveryMethod;
  }
}
