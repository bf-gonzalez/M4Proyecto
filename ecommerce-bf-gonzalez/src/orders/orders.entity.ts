import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderdetails.entity";
import { Users } from "../Users/users.entity";


@Entity()
export class Orders{

    /**
     * uuid v4 generado por la BBDD
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

     /**
     * Debe ingresar una fecha con formato dd/mm/yy
     * @example 02/07/2024
     */
    @Column()
    date: Date;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({name: 'user_id'})
    user: Users;
}