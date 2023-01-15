import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AdminGuard } from 'src/guards/admin.guard';
import { CustomerGuard } from 'src/guards/customer.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { LogoutGuard } from 'src/guards/logout.guard';
import { RefreshTokenGuard } from 'src/guards/refresh-token.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, LoginDto, UpdateCustomerDto } from './dto';
import { Customer } from './Schemas/customer.model';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'signup customer' })
  @ApiResponse({ status: 200, type: [Customer] })
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.signup(createCustomerDto, res);
  }

  @ApiOperation({ summary: 'signin customer' })
  @ApiResponse({ status: 200, type: [Customer] })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.signin(loginDto, res);
  }

  @ApiOperation({ summary: 'logout', description: 'logout customer' })
  @ApiResponse({ status: 200, type: [Customer] })
  @ApiBearerAuth()
  @UseGuards(LogoutGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.customerService.logout(req, res);
  }

  @ApiOperation({ summary: 'get token' })
  @ApiResponse({ status: 200, type: [Customer] })
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Body('id') id: number,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.refreshTokens(id, req, res);
  }

  @ApiOperation({ summary: 'get all customer' })
  @ApiResponse({ status: 200, type: [Customer] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: 'update customer by id' })
  @ApiResponse({ status: 200, type: [Customer] })
  @ApiBearerAuth()
  @UseGuards(CustomerGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomerById(+id, updateCustomerDto);
  }

  @ApiOperation({ summary: 'delete country by id' })
  @ApiResponse({ status: 200, type: [Customer] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.removeCustomerById(+id);
  }
}
