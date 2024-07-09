import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { Users } from 'src/Users/users.entity';
import { Orders } from 'src/orders/orders.entity';
import { OrderDetails } from 'src/orders/orderdetails.entity';
import { Products } from 'src/Products/products.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Users, Orders, OrderDetails, Products])],
  controllers: [OrdersController],
  providers: [OrdersService,OrdersRepository]
})
export class OrdersModule {}
