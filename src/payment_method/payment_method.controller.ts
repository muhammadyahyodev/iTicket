import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { PaymentMethod } from './Schemas/payment_method.model';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Payment method')
@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @ApiOperation({ summary: 'create payment method' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.createPaymentMethod(
      createPaymentMethodDto,
    );
  }

  @ApiOperation({ summary: 'get payment methods' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @Get()
  findAll() {
    return this.paymentMethodService.findAll();
  }

  @ApiOperation({ summary: 'get payment method by id' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentMethodService.findPaymentMethodById(+id);
  }

  @ApiOperation({ summary: 'update payment method by id' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto,
  ) {
    return this.paymentMethodService.updatePaymentMethodByID(
      +id,
      updatePaymentMethodDto,
    );
  }

  @ApiOperation({ summary: 'delete payment method by id' })
  @ApiResponse({ status: 200, type: [PaymentMethod] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMethodService.removePaymentMethods(+id);
  }
}
