import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * @function transform(
 *   value: any,
 *   {metatype, data, type}: ArgumentMetadata
 * ) -> value: any
 */
@Injectable()
export class ApiValidationPipe implements PipeTransform<any> {
  /** 
   * value -> {id, name, process}: ApiDto
   * metatype @type class ApiDto
   */
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    /** object -> value converted on metatype type -> {typed value} */
    const object = plainToInstance(metatype, value);
    /** errors -> be like {0:error, 1:error, 2:error} */
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value; // {id: int, ...}
  }
  /** Next, note the helper function toValidate(). 
   * It's responsible for bypassing the validation step when 
   * the current argument being processed is a native JavaScript type */
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
