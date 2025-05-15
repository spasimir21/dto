import { error, nestError, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { validateLength } from '../../mixins/length';
import { ArrayProperties } from '../../types/array';
import { validate } from '../validators';
import { DTO } from '../../DTO';

class ArrayValidator extends Validator<ArrayProperties<DTO>> {
  validate(value: any): ValidationError[] {
    if (!(value instanceof Array)) return [error('Value must be an array!')];

    const errors = validateLength(value.length, this.properties);
    if (errors.length > 0) return errors;

    for (let i = 0; i < value.length; i++)
      errors.push(...validate(value[i], this.properties.of).map(error => nestError(i.toString(), error)));

    return errors.length === 0 ? validateValidators(value, this.properties) : errors;
  }
}

export { ArrayValidator };
