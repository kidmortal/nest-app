import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty({ message: 'email não pode estar vazio' })
  @IsEmail({}, { message: 'email invalido' })
  @ApiProperty({ example: 'test@test.com' })
  email: string;

  @IsNotEmpty({ message: 'password não pode estar vazio' })
  @ApiProperty({ example: 'password123' })
  password: string;
}
