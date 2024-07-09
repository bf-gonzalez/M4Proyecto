import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import ICredentials from "./auth.interface";
import { CreateUserDto, LoginUserDto } from "src/Users/users.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Get()
    getAuth(){
        return this.authService.getAuth();
    }
    
    @Post('signin')
    signIn(@Body() credentials: LoginUserDto){
        const {email, password} = credentials
        return this.authService.signIn(email, password)
    }

    @Post('signup')
    signUp(@Body() user: CreateUserDto){
        
        return this.authService.signUp(user);
    }
}