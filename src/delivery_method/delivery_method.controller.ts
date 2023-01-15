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
import { GuardForAll } from 'src/guards/all.guard';
import { AllAdminGuard } from 'src/guards/for-all-admin.guard';
import { DeliveryMethodService } from './delivery_method.service';
import { CreateDeliveryMethodDto } from './dto/create-delivery_method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery_method.dto';
import { DeliveryMethod } from './Schemas/delivery_method.model';

@ApiTags('Delivery method')
@Controller('delivery-method')
export class DeliveryMethodController {
  constructor(private readonly deliveryMethodService: DeliveryMethodService) {}

  @ApiOperation({ summary: 'create delivery method' })
  @ApiResponse({ status: 200, type: [DeliveryMethod] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Post()
  create(@Body() createDeliveryMethodDto: CreateDeliveryMethodDto) {
    return this.deliveryMethodService.createDeliveryMethod(
      createDeliveryMethodDto,
    );
  }

  @ApiOperation({ summary: 'get all delivery method' })
  @ApiResponse({ status: 200, type: [DeliveryMethod] })
  @ApiBearerAuth()
  @UseGuards(GuardForAll)
  @Get()
  findAll() {
    return this.deliveryMethodService.findAll();
  }

  @ApiOperation({ summary: 'get delivery by id' })
  @ApiResponse({ status: 200, type: [DeliveryMethod] })
  @ApiBearerAuth()
  @UseGuards(GuardForAll)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryMethodService.findDeliveryMethodById(+id);
  }

  @ApiOperation({ summary: 'update delivery method by id' })
  @ApiResponse({ status: 200, type: [DeliveryMethod] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryMethodDto: UpdateDeliveryMethodDto,
  ) {
    return this.deliveryMethodService.updateDeliveryMethodById(
      +id,
      updateDeliveryMethodDto,
    );
  }

  @ApiOperation({ summary: 'delete delivery method by id' })
  @ApiResponse({ status: 200, type: [DeliveryMethod] })
  @ApiBearerAuth()
  @UseGuards(AllAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryMethodService.removeDeliveryMethodById(+id);
  }
}
