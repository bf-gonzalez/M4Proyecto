import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/Products/products.entity";


export class CreateOrderDto{
    
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>;
}