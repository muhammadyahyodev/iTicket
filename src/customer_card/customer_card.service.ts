import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from 'src/customer/Schemas/customer.model';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';
import { CustomerCard } from './Schemas/customer_card.model';

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard)
    private readonly customerCardRepository: typeof CustomerCard,
    @InjectModel(Customer) private readonly customer: typeof Customer,
  ) {}

  async createCustomerCard(createCustomerCardDto: CreateCustomerCardDto) {
    try {
      const { name } = createCustomerCardDto;
      await this.findCustomerCardByName(name);

      const customerCard = await this.customerCardRepository.create(
        createCustomerCardDto,
      );
      return customerCard;
    } catch (error) {}
  }

  async findAll() {
    const customerCard = await this.customerCardRepository.findAll({
      include: { all: true },
    });
    return customerCard;
  }

  async findCustomerCardById(id: number) {
    const customerCard = await this.customerCardRepository.findByPk(id);
    if (!customerCard) {
      throw new HttpException('Not found ', HttpStatus.NOT_FOUND);
    }
    return customerCard;
  }

  async updateCustomerCardById(
    id: number,
    updateCustomerCardDto: UpdateCustomerCardDto,
  ) {
    await this.findCustomerCardById(id);

    const customerCard = await this.customerCardRepository.update(
      updateCustomerCardDto,
      { where: { id }, returning: true },
    );
    return customerCard[1][0];
  }

  async removeCustomerCardById(id: number) {
    await this.findCustomerCardById(id);
    await this.customerCardRepository.destroy({ where: { id } });

    return id;
  }

  private async findCustomerCardByName(name: string) {
    const customerCard = await this.customerCardRepository.findOne({
      where: { name },
    });
    if (!customerCard) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
    return customerCard;
  }
}
