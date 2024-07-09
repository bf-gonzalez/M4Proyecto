import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "../orders/orders.entity";


@Entity({
    name: 'users',

})
export class Users{

    /**
     * uuid v4 generado por la BBDD
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Es de tipo varchar, puede usar hasta 50 caracteres no puede ser null
     * @example "Tester"
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string;

    /**
     * Es de tipo varchar, es unico y no puede ser null
     * @example tester@example.com
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,           
    })
    email: string;

    /**
     * Es de tipo varchar y no puede ser null y estar hashado
     * @example "*********"
     */
    @Column({
        type: 'varchar',
        length: 128,
        nullable: false,
    })
    password: string;

    /**
     * Es de tipo int
     * @example 123456789
     */
    @Column({
        type: 'int',
    })
    phone: number;

    /**
     * Es de tipo varchar 
     * @example testEjemplo
     */
    @Column({
        type: 'varchar',
        length: 50,
    })
    country: string;

    /**
     * Es de tipo text
     * @example "calle test al 4321"
     */
    @Column({
        type: 'text',
    })
    address: string;

    /**
     * Es de tipo varchar
     * @example Test City
     */
    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string;

    
    @Column({
        default: false,
    })
    isAdmin: boolean

    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn({name: 'order_id'})
    orders: Orders[];
}   