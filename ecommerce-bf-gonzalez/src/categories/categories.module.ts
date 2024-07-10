import { Module, OnModuleInit } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/categories/categories.entity';
import { ProductsService } from 'src/Products/products.service';
import { ProductsModule } from 'src/Products/products.module';
import { ProductsController } from 'src/Products/products.controller';
import { ProductsRepository } from 'src/Products/products.repository';
import { Products } from 'src/Products/products.entity';




@Module({
  imports:[TypeOrmModule.forFeature([Categories,Products]),
  ProductsModule],
  controllers: [CategoriesController,ProductsController],
  providers: [CategoriesService,CategoriesRepository,ProductsService,ProductsRepository]
})
export class CategoriesModule implements OnModuleInit{
  constructor(private readonly categoriesService: CategoriesService,
              private readonly productsService: ProductsService
  ){}

  async onModuleInit() {
      console.log("categorias y servicios agregados");
      await this.categoriesService.addCategories();
      await this.productsService.creatProducts();
      
  }
}



