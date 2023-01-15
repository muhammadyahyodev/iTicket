import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { CustomerGuard } from 'src/guards/customer.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { AllCustomerGuard } from 'src/guards/for-all-customer.guard';
import { CustomerCardService } from './customer_card.service';
import { CreateCustomerCardDto, UpdateCustomerCardDto } from './dto';
import { CustomerCard } from './Schemas/customer_card.model';

@ApiTags('Customer card')
@Controller('customer-card')
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @ApiOperation({ summary: 'add customer card' })
  @ApiResponse({ status: 200, type: [CustomerCard] })
  @ApiBearerAuth()
  @UseGuards(AllCustomerGuard)
  @Post()
  create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.createCustomerCard(createCustomerCardDto);
  }

  @ApiOperation({ summary: 'get customer card' })
  @ApiResponse({ status: 200, type: [CustomerCard] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Get()
  findAll() {
    return this.customerCardService.findAll();
  }

  @ApiOperation({ summary: 'get customer card by id' })
  @ApiResponse({ status: 200, type: [CustomerCard] })
  @ApiBearerAuth()
  @UseGuards(CustomerGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerCardService.findCustomerCardById(+id);
  }

  @ApiOperation({ summary: 'update customer card by id' })
  @ApiResponse({ status: 200, type: [CustomerCard] })
  @ApiBearerAuth()
  @UseGuards(CustomerGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto,
  ) {
    return this.customerCardService.updateCustomerCardById(
      +id,
      updateCustomerCardDto,
    );
  }

  @ApiOperation({ summary: 'delete customer card by id' })
  @ApiResponse({ status: 200, type: [CustomerCard] })
  @ApiBearerAuth()
  @UseGuards(CustomerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerCardService.removeCustomerCardById(+id);
  }
}
