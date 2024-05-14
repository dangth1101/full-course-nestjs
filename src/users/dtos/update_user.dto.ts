import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
