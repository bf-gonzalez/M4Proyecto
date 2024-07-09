import { Controller, Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/Users/users.entity";
import { AuthService } from "src/Auth/auth.service";

@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    controllers: [UserController],
    providers: [UserService,UsersRepository,AuthService],
    
})

export class UserModule{

}