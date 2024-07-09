import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}
    
    getCategories(){
        return this.categoriesRepository.addCategories();
    }
    
    addCategories(){
        return this.categoriesRepository.addCategories();
    }

}
