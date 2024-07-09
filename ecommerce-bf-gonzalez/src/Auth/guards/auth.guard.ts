import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/Users/roles.enum';



@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //Contexto de ejecucion
    const request = context.switchToHttp().getRequest();

    //Extraer Token del headers

    //Authorization bearer: TOKEN
    const token = request.headers.authorization?.split(' ')[1];
    if(!token) throw new UnauthorizedException('No se envio el token');

    try {
      //Validacion del token
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      if(!user) {
        throw new UnauthorizedException('Error al validar token');
      }

      // Fecha de expiracion
      user.exp = new Date(user.exp * 1000);
      user.roles = user.isAdmin ? [Role.Admin] : [Role.User]
      request.user = user;

      return true

    } catch (error) {
      throw new UnauthorizedException('Error al validar token');
      
    }

  }
}
