import {
  IsString,
  IsDateString,
  IsNumber,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
class Pictures {
  @IsString()
  url: string;
  @IsString()
  public_id: string;
}
export class FoodDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  expiryDate: string;
  @IsString()
  description: string;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
  @IsString()
  @IsNotEmpty()
  address: string;
  @ValidateNested({ each: true })
  pictures: Pictures[];
}
