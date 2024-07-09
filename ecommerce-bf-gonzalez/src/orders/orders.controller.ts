import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './orders.dto';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor (private readonly orderService: OrdersService){}

    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto){
        const { userId, products } = order;
        return this.orderService.addOrder(userId, products);
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe) id: string){
        return this.orderService.getOrder(id);
    }
}
