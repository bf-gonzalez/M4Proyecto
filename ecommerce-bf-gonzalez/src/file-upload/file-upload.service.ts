import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/Products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor (private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products) 
    private readonly productRopository: Repository<Products>,
    ){}


    async upLoadImage(file: Express.Multer.File, productId: string) {

        //Verifico el producto
        const product = await this.productRopository.findOneBy({ id: productId});
        if(!product){
            throw new NotFoundException('Producto no encontrado')
        }

        //Cargar a cloudinary si el producto existe
        const response = await this.fileUploadRepository.uploadImage(file)
        if(!response.secure_url){
            throw new NotFoundException('Error subiendo imagen')
        }
        //Actualizar img
        await this.productRopository.update(productId, {
            imgUrl: response.secure_url,
        });

        const upDatedProduct = await this.productRopository.findOneBy({id: productId});

        return upDatedProduct;
    }
}
