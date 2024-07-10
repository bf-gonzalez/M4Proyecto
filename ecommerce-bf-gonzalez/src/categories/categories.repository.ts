import { Injectable } from "@nestjs/common";
import * as data from '../utils/data.json';
import { Categories } from "src/categories/categories.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoriesRepository{
    constructor(
        @InjectRepository(Categories)
        private categoriesRepository: Repository<Categories>,
    ){}

    async getCategories(){
        return await this.categoriesRepository.find();
    }

    async addCategories(){
        data?.map(async (element) => {
            await this.categoriesRepository
            //crea un objeto queryBuilder permite construir consultas SQL
            .createQueryBuilder()
            //Hace la insercion en la base de datos
            .insert()
            //espesifica la tabla de la en la que se hace la insercion
            .into(Categories)
            //define los valores a insertar en la BD
            .values({name: element.category})
            //si existe clave unica la operacion debe ignorase 
            .orIgnore()
            //Ejecuta la consulta de isercion en la base de datos
            .execute();
        });
        return 'Categories agregadas';
    }


}