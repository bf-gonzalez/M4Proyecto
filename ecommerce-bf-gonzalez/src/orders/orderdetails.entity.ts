import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Products } from "../Products/products.entity";


@Entity()
export class OrderDetails{

    /**
     * uuid v4 generado por la BBDD
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Es de tipo decimal, precicion 10 y scale de 2 
     * @example 35.20
     */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: number;

    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({ name: 'order_id'})
    order: Orders;


    @ManyToMany(() => Products)
    @JoinTable({
        name: 'ORDERDETAILS_PRODUCTS',
        joinColumn:{
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'orderdetail_id',
            referencedColumnName: 'id'
        }
    })
    products: Products[];
    
}