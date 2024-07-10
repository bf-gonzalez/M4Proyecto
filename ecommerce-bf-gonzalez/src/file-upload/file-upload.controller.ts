import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/Users/roles.enum';

@ApiTags('file')
@Controller('file')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService){}

    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @Roles(Role.Admin)
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@Param('id') productId: string,
                @UploadedFile(
                    new ParseFilePipe({validators: [
                        new MaxFileSizeValidator({
                            maxSize: 200000,
                            message: 'La imagen es demasiado grande'
                        }),
                        new FileTypeValidator({
                            fileType: /(.jpg|.png|.jpeg|.webp)/,
                            
                        })
                    ]
                })
                ) file: Express.Multer.File, ) {
   
         return this.fileUploadService.upLoadImage(file, productId)       
    }

}
