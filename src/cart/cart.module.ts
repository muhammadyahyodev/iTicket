import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './Schemas/cart.model';
import { Ticket } from 'src/ticket/Schemas/ticket.model';
import { Customer } from 'src/customer/Schemas/customer.model';
import { Status } from 'src/status/Schemas/status.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart, Ticket, Customer, Status]),
    JwtModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
