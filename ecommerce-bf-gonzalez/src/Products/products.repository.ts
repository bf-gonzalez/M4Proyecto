import { Injectable } from "@nestjs/common";
import IProducts from "./products.interface";
import * as data from "../utils/data.json";
import { InjectRepository } from "@nestjs/typeorm";
import { Products } from "src/Products/products.entity";
import { Repository } from "typeorm";
import { Categories } from "src/categories/categories.entity";
import { error } from "console";



@Injectable()

export class ProductsRepository{
    constructor(
      @InjectRepository(Products)
      private productsRepository: Repository<Products>,
      @InjectRepository(Categories)
      private categoriesRepository: Repository<Categories>,
    ){}
     

    async getProducts(page: number, limit: number): Promise<Products[]>{
      let products = await this.productsRepository.find({
        relations: {
          category: true,
        },
      });

      const start = (page - 1) * limit;
      const end = start + limit;
      products = products.slice(start, end);
      
      return products;
    }

    async getById(id: string){
      const product = await this.productsRepository.findOneBy({ id });
      if(!product){
        return `Producto con id ${id} no encontrado`;
      }
      return product;
    };

    async createProduct(){
      //Comprobando que la categoria exista 
      const categories = await this.categoriesRepository.find();
      data?.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );

        //Crear un nuevo producto y setear los atributos
        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.category = category;

        //Subir el nuevo producto a BD
        await this.productsRepository
        //crea un objeto queryBuilder permite construir consultas SQL
        .createQueryBuilder()
        //Hace la insercion en la base de datos
        .insert()
        //espesifica la tabla de la en la que se hace la insercion
        .into(Products)
        //define los valores a insertar en la BD
        .values(product)
        //Indica que  campos deben actualizarse si ya existe un registro con una clave unica
        .orUpdate(['description', 'price', 'imgUrl', 'stock','category_id'],['name'])
        //Ejecuta la consulta de isercion en la base de datos
        .execute();
      });
      return "Productos agregados";
    }
    
    async updateProduct(id: string, product: Products){
      await this.productsRepository.update(id, product);
      const updateProduct = await this.productsRepository.findOneBy({ id });

      return updateProduct;

    }

    async deleteProduct(id: string){
      const product = await this.productsRepository.findOneBy({ id })
      if(!product) return `El producto ${id} no existe`

      this.productsRepository.remove(product);
      const { name } = product;


      return name +  ` id: ${id} Fue eliminado`;
     
    }

}