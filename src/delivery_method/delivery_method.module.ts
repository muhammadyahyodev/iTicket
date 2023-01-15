import { Module } from '@nestjs/common';
import { DeliveryMethodService } from './delivery_method.service';
import { DeliveryMethodController } from './delivery_method.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeliveryMethod } from './Schemas/delivery_method.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([DeliveryMethod]), JwtModule],
  controllers: [DeliveryMethodController],
  providers: [DeliveryMethodService],
  exports: [DeliveryMethodService],
})
export class DeliveryMethodModule {}
