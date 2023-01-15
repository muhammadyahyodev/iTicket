import { Module } from '@nestjs/common';
import { CustomerAddressService } from './customer_address.service';
import { CustomerAddressController } from './customer_address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerAddress } from './Schemas/customer_address.model';
import { Customer } from 'src/customer/Schemas/customer.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([CustomerAddress, Customer]), JwtModule],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
