import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Products } from "src/Products/products.entity";
import { Role } from "src/Users/roles.enum";
import { Roles } from "src/decorators/roles.decorator";
import { AuthGuard } from "src/Auth/guards/auth.guard";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('products')
@Controller('products')
export class ProductsController{
    constructor(private readonly   productsService: ProductsService) {}

    @HttpCode(200)
    @Get()
    getProducts(@Query('page') page?: string,
                @Query('limit') limit?: string){
        
                    return this.productsService.getProducts(Number(page), Number(limit));
                }

    @HttpCode(200)
    @Get(':id')
    getProductsById(@Param('id', ParseUUIDPipe) id: string){
        return this.productsService.getProductsById(id);
    }

    
    @Post('seeder')
    createProducts(){
        return this.productsService.creatProducts();
    }

    @ApiBearerAuth()
    @HttpCode(201)
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    updateProducts (@Param('id', ParseUUIDPipe) id : string, @Body() prooduct: Products){
        return this.productsService.updateProducts(id, prooduct)
    }
    
    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    deleteProducts(@Param('id', ParseUUIDPipe) id: string){
        return this.productsService.deleteProducts(id);
    }
    
}