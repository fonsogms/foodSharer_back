import { IsNumber, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  phone: string;
  @IsString()
  mail: string;
  @IsString()
  address: string;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
}
