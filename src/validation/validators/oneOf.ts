import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { OneOfProperties } from '../../types/oneOf';
import { validate } from '../validators';
import { DTO } from '../../DTO';

class OneOfValidator<T extends DTO> extends Validator<OneOfProperties<T>> {
  validate(value: any): ValidationError[] {
    for (const option of this.properties.options) {
      const errors = validate(value, option);
      if (errors.length === 0) return validateValidators(value, this.properties);
    }

    return [error(`Value must be one of: ${this.properties.options.map(option => option.stringify()).join(', ')}!`)];
  }
}

export { OneOfValidator };
