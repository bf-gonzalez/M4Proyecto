import { BadRequestException, Injectable } from "@nestjs/common";
import { Users } from "src/Users/users.entity";
import { UsersRepository } from "src/Users/users.repository";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor (private readonly usersRepository: UsersRepository,
                private readonly  jwtService: JwtService
    ){}

    getAuth(): string{
        return "Autenticacion...";
    }

    async signIn(email: string, password: string){
        
        //ver si el user existe
        const user = await this.usersRepository.getUserByEmail(email);
        if(!user) throw new BadRequestException('Credenciales incorrectas');
        
        //Validar password

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) throw new BadRequestException('Credenciales incorrectas');

        //Generar Token
        const payload = { id: user.id, email: user.email, isAdmin: user.isAdmin};
        const token = this.jwtService.sign(payload);

        return {
            message: 'Usuario logueado',
            token,
        };

    }

    async signUp(user: Partial<Users> ){
        const { email, password } = user;

        //Verifico que el email no este en uso
        const foundUser = await this.usersRepository.getUserByEmail(email)
        if(foundUser) throw new BadRequestException('El mail ya se encuentra registrado')
        
            
        //Hashear password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Crear User
        return await this.usersRepository.createUser({
            ...user,
            password: hashedPassword
        })
    }
}