import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { NumberProperties } from '../../types/number';
import { validateRange } from '../../mixins/range';

class NumberValidator extends Validator<NumberProperties> {
  validate(value: any): ValidationError[] {
    if (typeof value !== 'number') return [error('Value must be a number!')];
    const errors = validateRange(value, 'value', this.properties);
    if (this.properties.int === true && value % 1 != 0) errors.push(error('Value must be an integer!'));
    return errors.length === 0 ? validateValidators(value, this.properties) : errors;
  }
}

export { NumberValidator };
