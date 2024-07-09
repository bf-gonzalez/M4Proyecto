import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UserModule } from "./users.module";
import IUser from "./user.interface";
import { Users } from "src/Users/users.entity";
import { CreateUserDto } from "./users.dto";



@Injectable()
export class UserService{
    constructor (private readonly userRepository: UsersRepository){}
    
    getUsers(page: number, limit: number){
        return this.userRepository.getUsers(page, limit);
    }
    
    //getUserName
    getUsersByName(name: string) {
        return this.userRepository.getByName(name);
    }

    //get(id)
    getUserById(id: string) {
        return this.userRepository.getById(id);
    }
    
    
    //post
    createUser(user: CreateUserDto){
        return this.userRepository.createUser(user);
    }

    //put(id)
    updateUser(id: string, user: Users){
        return this.userRepository.updateUser(id, user)

    }

    //delete(id)
    deleteUser(id: string){
        return this.userRepository.deleteUser(id);
    }

}