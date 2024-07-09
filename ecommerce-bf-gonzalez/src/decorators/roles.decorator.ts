import { SetMetadata } from "@nestjs/common";
import { Role } from "src/Users/roles.enum";


export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);