import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { BooleanProperties } from '../../types/boolean';

class BooleanValidator extends Validator<BooleanProperties> {
  validate(value: any): ValidationError[] {
    if (typeof value !== 'boolean') return [error('Value must be a boolean!')];
    return validateValidators(value, this.properties);
  }
}

export { BooleanValidator };
