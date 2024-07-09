import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/Products/products.entity";
import { Categories } from "src/categories/categories.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Products, Categories])],
    controllers:[ProductsController],
    providers: [ProductsService, ProductsRepository],
})
export class ProductsModule{}