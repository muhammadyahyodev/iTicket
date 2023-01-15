import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from 'src/customer/Schemas/customer.model';
import { Status } from 'src/status/Schemas/status.model';
import { Ticket } from 'src/ticket/Schemas/ticket.model';
import { CreateCartDto } from './dto';
import { Cart } from './Schemas/cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart) private readonly cartRepository: typeof Cart,
    @InjectModel(Ticket) private readonly ticket: typeof Ticket,
    @InjectModel(Customer) private readonly customer: typeof Customer,
    @InjectModel(Status) private readonly status: typeof Status,
  ) {}

  async createCart(createCartDto: CreateCartDto) {
    try {
      const cart = await this.cartRepository.create(createCartDto);
      return cart;
    } catch (error) {
      throw new HttpException(
        'ForegnKey is not avialable',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAll() {
    const carts = await this.cartRepository.findAll({ include: { all: true } });
    return carts;
  }

  async findCartById(id: number) {
    const cart = await this.cartRepository.findByPk(id);
    if (!cart) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return cart;
  }

  async removeCartById(id: number) {
    await this.findCartById(id);
    await this.cartRepository.destroy({ where: { id } });

    return id;
  }
}
