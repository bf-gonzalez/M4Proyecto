import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import IProducts from "./products.interface";

import { Products } from "src/Products/products.entity";

@Injectable()
export class ProductsService{
    constructor (private readonly productsRepository: ProductsRepository){}

    getProducts(page: number, limit: number){
        return  this.productsRepository.getProducts(page, limit); 
    }
    
    getProductsById(id: string){
        return this.productsRepository.getById(id);
    }

    //post
    creatProducts(){
        return this.productsRepository.createProduct()
    }
    
    //put
    updateProducts(id: string, products: Products){
        return this.productsRepository.updateProduct(id, products);
    }

    //delete
    deleteProducts(id: string){
        return this.productsRepository.deleteProduct(id);
    }
}