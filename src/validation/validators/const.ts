import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { ConstProperties } from '../../types/const';
import { stringify } from '../../utils/stringify';

class ConstValidator<T> extends Validator<ConstProperties<T>> {
  validate(value: any): ValidationError[] {
    if (value === this.properties.value) return validateValidators(value, this.properties);
    return [error(`Value must be ${stringify(this.properties.value)}!`)];
  }
}

export { ConstValidator };
