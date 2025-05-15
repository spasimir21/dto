import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { EnumProperties } from '../../types/enum';

class EnumValidator<T> extends Validator<EnumProperties<T>> {
  readonly valuesSet = new Set(this.properties.values);

  validate(value: any): ValidationError[] {
    if (!this.valuesSet.has(value))
      return [error(`Value must be one of the following: ${this.properties.values.join(', ')}!`)];

    return validateValidators(value, this.properties);
  }
}

export { EnumValidator };
