import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from 'src/customer/Schemas/customer.model';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto';
import { CustomerAddress } from './Schemas/customer_address.model';

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress)
    private readonly customerAddressRepository: typeof CustomerAddress,
    @InjectModel(Customer) private readonly customer: typeof Customer,
  ) {}

  async createCustomerAddress(
    createCustomerAddressDto: CreateCustomerAddressDto,
  ) {
    const { customer_id } = createCustomerAddressDto;
    const customer = await this.customer.findByPk(customer_id);

    if (!customer) {
      throw new HttpException('ForegnKey not avialable', HttpStatus.NOT_FOUND);
    }

    const customerAddress = await this.customerAddressRepository.create(
      createCustomerAddressDto,
    );

    return customerAddress;
  }

  async findAll() {
    const customerAddresses = await this.customerAddressRepository.findAll({
      include: { all: true },
    });
    return customerAddresses;
  }

  async findCustomerAddressById(id: number) {
    const customerAddress = await this.customerAddressRepository.findByPk(id);
    if (!customerAddress) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return customerAddress;
  }

  async updateCustomerAddressById(
    id: number,
    updateCustomerAddressDto: UpdateCustomerAddressDto,
  ) {
    await this.findCustomerAddressById(id);

    const customerAddress = await this.customerAddressRepository.update(
      updateCustomerAddressDto,
      { where: { id }, returning: true },
    );
    return customerAddress[1][0];
  }

  async removeCustomerAddressById(id: number) {
    await this.findCustomerAddressById(id);
    await this.customerAddressRepository.destroy({ where: { id } });

    return id;
  }
}
