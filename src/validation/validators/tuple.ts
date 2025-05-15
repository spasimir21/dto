import { error, nestError, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { TupleProperties } from '../../types/tuple';
import { validate } from '../validators';
import { DTO } from '../../DTO';

class TupleValidator<T extends DTO[]> extends Validator<TupleProperties<T>> {
  validate(value: any): ValidationError[] {
    if (!(value instanceof Array)) return [error('Value must be a tuple!')];

    if (value.length !== this.properties.values.length)
      return [error(`Value must have a length of exactly ${this.properties.values.length}!`)];

    const errors: ValidationError[] = [];

    for (let i = 0; i < this.properties.values.length; i++)
      errors.push(...validate(value[i], this.properties.values[i]).map(error => nestError(i.toString(), error)));

    return errors.length === 0 ? validateValidators(value as any, this.properties) : errors;
  }
}

export { TupleValidator };
