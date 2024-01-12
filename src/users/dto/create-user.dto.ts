import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty({ message: 'email não pode estar vazio' })
  @IsEmail({}, { message: 'email invalido' })
  email: string;

  @IsNotEmpty({ message: 'password não pode estar vazio' })
  password: string;
}
