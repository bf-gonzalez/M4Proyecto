import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Users/users.module';
import { ProductsModule } from './Products/products.module';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './Products/products.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),
    UserModule, 
    ProductsModule, 
    AuthModule, 
    CategoriesModule, 
    OrdersModule, 
    FileUploadModule, 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions:{ expiresIn: '60m'}
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
