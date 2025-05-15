import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { ValueProperties } from '../../types/value';
import { stringify } from '../../utils/stringify';

class ValueValidator<T> extends Validator<ValueProperties<T>> {
  validate(value: any): ValidationError[] {
    if (!this.properties.isValid(value)) return [error(`Value must be ${stringify(this.properties.getValue())}!`)];
    return validateValidators(value, this.properties);
  }
}

export { ValueValidator };
