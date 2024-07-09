import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categories } from "../categories/categories.entity";
import { OrderDetails } from "../orders/orderdetails.entity";


@Entity()
export class Products{

    /**
     * uuid v4 generado por la BBDD
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

     /**
     * Es de tipo varchar , no puede ser null y es unico
     * @example "Motorola G30"
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    name: string;

     /**
     * Es de tipo text y no puede ser null
     * @example "tiene android 14 y una camara de 125MP"
     */
    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

     /**
     * Es de tipo decimal, precision de 10 y una escala de 2, no puede ser null
     * @example 25.50
     */
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable:false,
    })
    price: number;

     /**
     * Es de tipo int y no puede ser null
     * @example 15
     */
    @Column({
        type: 'int',
        nullable: false,
    })
    stock: number;

     /**
     * Es de tipo text y tiene que ser una URL
     * @example "https://res.cloudinary.com/dyeji7bvg/image/upload/v1720248068/uhzzius1h9lbjc8k3hd9.webp"
     */
    @Column({
        type: 'text',
    })
    imgUrl: string;
    
    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({name: 'category_id'})
    category: Categories;

    @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[];
}