import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './Schemas/customer.model';
import { JwtModule } from '@nestjs/jwt';
import { Language } from 'src/language/Schemas/language.model';

@Module({
  imports: [SequelizeModule.forFeature([Customer]), JwtModule],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
