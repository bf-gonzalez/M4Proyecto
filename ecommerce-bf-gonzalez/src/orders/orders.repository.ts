import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/orders/orderdetails.entity";
import { Orders } from "src/orders/orders.entity";
import { Products } from "src/Products/products.entity";
import { Users } from "src/Users/users.entity";
import { Repository } from "typeorm";


@Injectable()
export class OrdersRepository {
    constructor ( 
        @InjectRepository(Orders)
        private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails)
        private orderDetailRepository: Repository<OrderDetails>,
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
    ){}

    async addOrder(userId: string, products: any){
        let total = 0;

        //verificar user
        const user = await this.usersRepository.findOneBy({id: userId})
        if(!user) {
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
            
        }


        //Creando una Orden
        const order = new Orders();
        order.date = new Date();
        order.user = user;


        const newOrder = await this.ordersRepository.save(order);

        //Asosiando id a los productos
        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({
                    id: element.id,
                });
                if(!product) {
                    throw new NotFoundException(`Producto con id ${element.id} no encontrado`);
                }

                //Monto total
                total += Number(product.price);

                //Nuevo stock
                await this.productsRepository.update(
                    {id: element.id },
                    {stock: product.stock - 1},
                );
              return product;

            }),
        );

        //crear OrderDetail y guardarlo en la bd
        const orderDetail = new OrderDetails();

        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;
        await this.orderDetailRepository.save(orderDetail);

        //Informar la compra
        return await this.ordersRepository.find({
            where: {id: newOrder.id},
            relations: {
                orderDetails: true,
            },
        });
    }

    getOrder(id: string){
        const order = this.ordersRepository.findOne({
            where: { id },
            relations: {
                orderDetails:{
                    products: true,
                },
            },
        });

        
        if(!order){
            throw new NotFoundException(`Orden con id ${id} no encontrada`);
            
        }

        return order;
    }

     async deleteOrden(orderId: string){
        const order = await this.ordersRepository.findOne({
            where: { id: orderId },
            relations: { orderDetails: {
                products: true
            }}
        });
        if(!order) {
            throw new NotFoundException(`Orden con id ${orderId} no encontrado`);
        }
        

        

        
        
        await this.ordersRepository.remove(order)

    }
    
}