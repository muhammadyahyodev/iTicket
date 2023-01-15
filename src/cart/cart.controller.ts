import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Get,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from 'src/guards/admin.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { AllCustomerGuard } from 'src/guards/for-all-customer.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto';
import { Cart } from './Schemas/cart.model';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'create cart' })
  @ApiResponse({ status: 200, type: [Cart] })
  @ApiBearerAuth()
  @UseGuards(AllCustomerGuard)
  @Post('add')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @ApiOperation({ summary: 'get all carts' })
  @ApiResponse({ status: 200, type: [Cart] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @ApiOperation({ summary: 'get cart by id' })
  @ApiResponse({ status: 200, type: [Cart] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findCartById(+id);
  }

  @ApiOperation({ summary: 'delete cart by id' })
  @ApiResponse({ status: 200, type: [Cart] })
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.cartService.removeCartById(+id);
  }
}
