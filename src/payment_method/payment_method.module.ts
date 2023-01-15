import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { PaymentMethodController } from './payment_method.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentMethod } from './Schemas/payment_method.model';
import { JwtModule } from '@nestjs/jwt';
import { LanguageModule } from 'src/language/language.module';

@Module({
  imports: [
    SequelizeModule.forFeature([PaymentMethod]),
    JwtModule,
    LanguageModule,
  ],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
