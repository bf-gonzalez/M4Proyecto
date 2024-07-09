import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import IUser from "./user.interface";
import { AuthGuard } from "src/Auth/guards/auth.guard";
import { Users } from "src/Users/users.entity";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "./roles.enum";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { get } from "http";



@ApiTags('users')
@Controller('users')
export class UserController{
    constructor(private readonly userService: UserService,
               
    ) {}

    @ApiBearerAuth()
    @HttpCode(200)
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    getUsers(@Query('name') name?: string,
            @Query('page') page?: string,
            @Query('limit') limit?: string){
        
        if(name){
            return  this.userService.getUsersByName(name);
        }
        !page ? (page = '1') : page;
        !limit ? (limit = '5') : limit;
        if(page && limit)return  this.userService.getUsers(Number(page), Number(limit));
        
    }

    @ApiBearerAuth()
    @HttpCode(200)
    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string){
        return this.userService.getUserById(id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('test')
    getTest(){
        return 'Ruta de test para cualquier usuario'
    }
   
    @ApiBearerAuth()
    @HttpCode(201)
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Users){
        return this.userService.updateUser(id, user)
    }
    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string){
        return this.userService.deleteUser(id);
    }

}