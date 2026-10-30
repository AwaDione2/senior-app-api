import { IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^\+?[0-9 ]{8,16}$/, { message: 'phone must be a valid phone number' })
  phone: string;

  @IsString()
  @Matches(/^[0-9]{4}$/, { message: 'pin must be exactly 4 digits' })
  pin: string;
}
