import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "src/Users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/Users/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers:[AuthController],
    providers:[AuthService,UsersRepository],
})
export class AuthModule{

}