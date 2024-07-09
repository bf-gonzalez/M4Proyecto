import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "../Products/products.entity";


@Entity()
export class Categories{

     /**
     * uuid v4 generado por la BBDD
     */
    @PrimaryGeneratedColumn('uuid')
    id: string;

     /**
     * Es de tipo varchar, unico y no puede ser null
     * @example "Monitor"
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    name: string;

    @OneToMany(() => Products, (product) => product.category)
    @JoinColumn()
    products: Products[];
}