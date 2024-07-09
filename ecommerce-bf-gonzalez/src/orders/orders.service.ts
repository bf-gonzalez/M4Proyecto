import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Products } from 'src/Products/products.entity';

@Injectable()
export class OrdersService {
    constructor (private ordersRepository: OrdersRepository){}

    addOrder(userId: string, product: any){
        return this.ordersRepository.addOrder(userId, product);
    }

    getOrder(id: string){
        return this.getOrder(id);
    }
}
