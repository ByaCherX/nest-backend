//? Data Type Object (DTO)

import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ApiDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  name: string;

  @IsString()
  process: string;
}

export class ApiDataDto {
  @IsNumber()
  @IsOptional()
  DataId: number;

  @IsArray()
  data: [];

  @IsString()
  @IsOptional()
  metadata: string;
}
