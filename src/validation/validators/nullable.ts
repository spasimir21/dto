import { validateValidators } from '../../mixins/validators';
import { NullableProperties } from '../../types/nullable';
import { ValidationError, Validator } from '../Validator';
import { validate } from '../validators';
import { DTO } from '../../DTO';

class NullableValidator<T extends DTO> extends Validator<NullableProperties<T>> {
  validate(value: any): ValidationError[] {
    if (value === null) return [];
    const errors = validate(value, this.properties.value);
    return errors.length === 0 ? validateValidators(value, this.properties) : errors;
  }
}

export { NullableValidator };
