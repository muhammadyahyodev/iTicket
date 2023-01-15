import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { PaymentMethod } from './Schemas/payment_method.model';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod)
    private readonly paymentMethodRepository: typeof PaymentMethod,
  ) {}

  async createPaymentMethod(createPaymentMethodDto: CreatePaymentMethodDto) {
    const { name } = createPaymentMethodDto;
    await this.findPaymentMethodByName(name);

    const paymentMethod = await this.paymentMethodRepository.create(
      createPaymentMethodDto,
    );

    return paymentMethod;
  }

  async findAll() {
    const paymentMethods = await this.paymentMethodRepository.findAll({
      include: { all: true },
    });
    return paymentMethods;
  }

  async findPaymentMethodById(id: number) {
    const paymentMethod = await this.paymentMethodRepository.findByPk(id);
    if (!paymentMethod) {
      throw new HttpException('Payment method not found', HttpStatus.NOT_FOUND);
    }
    return paymentMethod;
  }

  async updatePaymentMethodByID(
    id: number,
    updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    await this.findPaymentMethodById(id);

    const paymentMethod = await this.paymentMethodRepository.update(
      updatePaymentMethodDto,
      { where: { id }, returning: true },
    );

    return paymentMethod[1][0];
  }

  async removePaymentMethods(id: number) {
    await this.findPaymentMethodById(id);
    await this.paymentMethodRepository.destroy({ where: { id } });

    return id;
  }

  private async findPaymentMethodByName(name: string) {
    const paymentMethod = await this.paymentMethodRepository.findOne({
      where: { name },
    });
    if (paymentMethod) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }

    return paymentMethod;
  }
}
