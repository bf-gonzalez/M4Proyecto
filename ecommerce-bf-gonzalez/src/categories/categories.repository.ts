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
            .createQueryBuilder()
            .insert()
            .into(Categories)
            .values({name: element.category})
            .orIgnore()
            .execute();
        });
        return 'Categories agregadas';
    }


}