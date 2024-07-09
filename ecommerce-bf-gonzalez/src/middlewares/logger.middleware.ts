import { ConsoleLogger, Injectable, NestMiddleware } from "@nestjs/common";
import { log } from "console";
import {Request, NextFunction, Response } from "express";

/*@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`Estas ejecutando un metodo ${req.method} en la ruta ${req.url}`);
        
        next();
    };

}
    */
export function loggerGlobal(req: Request, res: Response, next: NextFunction){
    const now = new Date().toISOString();
   // const date = actualDate.toLocaleDateString();
  //  const time = actualDate.toLocaleTimeString();
    const method = req.method;
    const url= req.url;
    const ip = req.ip;
    console.log(` [${now}] ${ip} - Estas ejecutando un metodo ${method} en la ruta ${url}`);
        
    next();
}