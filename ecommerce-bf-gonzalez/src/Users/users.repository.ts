import { Injectable } from "@nestjs/common";
import IUser from "./user.interface";
import { refCount, retryWhen, skip } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/Users/users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./users.dto";


@Injectable()
export class UsersRepository{
  constructor (
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  
      async getUsers(page: number, limit: number){

        const skip = (page - 1) * limit;
        const users =  await this.usersRepository.find({
          take: limit,
          skip: skip,
        });
        return users.map(({password, ...userNoPassword }) => userNoPassword );
      }

      async getById(id: string ) {

          const user = await this.usersRepository.findOne({
            where: { id },
            relations: {
              orders: true,
            },
          });
          if(!user) return `No se encontro el usuario con id ${id}`;
          const {password,isAdmin, ...userNoPassword } = user;
          return userNoPassword;
      }

      async  getByName(name: string) {
        if(!name){
          return `El nombre ${name} no se encontro`
        }
        return  await this.usersRepository.findOneBy({name});
    }

    async createUser(user: Partial<Users>){
      const newUser = await this.usersRepository.save(user);

      const dbUser = await this.usersRepository.findOneBy({id: newUser.id})

      const { password, isAdmin, ...userNoPassword } = dbUser;

      return userNoPassword;
    }
    
    async updateUser(id: string, user: Users ){
      await this.usersRepository.update(id, user);
      const updatedUser = await this.usersRepository.findOneBy({ id });
      const { password, isAdmin, ...userNoPasword } = updatedUser;
      return userNoPasword;
    }

    async deleteUser(id: string){
      const user = await this.usersRepository.findOneBy({ id });
      this.usersRepository.remove(user);
      const { password,isAdmin, ...userNoPassword } = user;
      return userNoPassword;
    }

    getUserByEmail(email: string){
      return  this.usersRepository.findOneBy({ email });
    }

}