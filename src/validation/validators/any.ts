import { validateValidators } from '../../mixins/validators';
import { ValidationError, Validator } from '../Validator';
import { AnyProperties } from '../../types/any';

class AnyValidator extends Validator<AnyProperties> {
  validate(value: any): ValidationError[] {
    return validateValidators(value, this.properties);
  }
}

export { AnyValidator };
