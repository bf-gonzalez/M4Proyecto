import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length, Matches, MaxLength, MinLength, minLength, Validate } from "class-validator";
import { MatchPassword } from "src/decorators/matchPassword.decorator";


export class CreateUserDto{

    /**
     * Debe ser un string de entre 3 y 80 caracteres
     * @example 'Test User'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @Matches(/^[a-zA-Z]+$/, {
        message: 'El nombre no puede contener numeros.'
      })
    name: string;

    /**
     * Debe ser un string con formato de email valido
     * @example 'user01@example.com'
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;


    /**
     * Debe contener entre 8 y 15 caracteres, e incluir al menos 1 letra minuscula, una mayuscula, un numero y un caracter especial
     * @example 'Test001$'
     */
    @IsNotEmpty()
    @IsString()
    @MaxLength(15)
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;


    /**
     * Debe coinsidir con el password
     * @example 'Test001$'
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    /**
     * Debe ser un string entre 3 y 80 caracteres
     * @example 'Test Street 12345'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    /**
     * Debe ser un number
     * @example 123456789
     */
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    /**
     * Debe ser un string de entre 4 y 20 caracteres
     * @example 'Test Country'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    country: string;

    /**
     * Debe ser un string de entre 5 y 20 caracteres
     * @example 'Test City'
     */
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @ApiHideProperty()
    @IsEmpty()
    isAdmin?: boolean;
}


export class UpdateUserDto extends PickType(CreateUserDto, ['name', 'email', 'password', 'address', 'phone', 'country', 'city']){

}

export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password']){

    
    
}