import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/Products/products.entity";


export class CreateOrderDto{
    
    /**
     * Es el uuid del usuario que crea su orden 
     */
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    /**
     * es la lista de productos que al menos tiene que contener 1 elemento
     */
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>;
}