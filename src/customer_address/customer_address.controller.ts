import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { CustomerGuard } from 'src/guards/customer.guard';
import { CustomerAddressService } from './customer_address.service';
import { CreateCustomerAddressDto, UpdateCustomerAddressDto } from './dto';
import { CustomerAddress } from './Schemas/customer_address.model';
import { GuardForAll } from 'src/guards/all.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';

@ApiTags('Customer address')
@Controller('customer-address')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @ApiOperation({ summary: 'add customer address' })
  @ApiResponse({ status: 200, type: [CustomerAddress] })
  @ApiBearerAuth()
  @UseGuards(GuardForAll)
  @Post()
  create(@Body() createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressService.createCustomerAddress(
      createCustomerAddressDto,
    );
  }

  @ApiOperation({ summary: 'get all customers address' })
  @ApiResponse({ status: 200, type: [CustomerAddress] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Get()
  findAll() {
    return this.customerAddressService.findAll();
  }

  @ApiOperation({ summary: 'get customer by id' })
  @ApiResponse({ status: 200, type: [CustomerAddress] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerAddressService.findCustomerAddressById(+id);
  }

  @ApiOperation({ summary: 'update customer address' })
  @ApiResponse({ status: 200, type: [CustomerAddress] })
  @ApiBearerAuth()
  @UseGuards(CustomerGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto,
  ) {
    return this.customerAddressService.updateCustomerAddressById(
      +id,
      updateCustomerAddressDto,
    );
  }

  @ApiOperation({ summary: 'delete customer address' })
  @ApiResponse({ status: 200, type: [CustomerAddress] })
  @ApiBearerAuth()
  @UseGuards(CustomerAddress)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerAddressService.removeCustomerAddressById(+id);
  }
}
