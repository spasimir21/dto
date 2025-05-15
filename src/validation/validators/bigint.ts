import { BigIntProperties, BigIntValueProperties } from '../../types/bigint';
import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { validateRange } from '../../mixins/range';

class BigIntValidator extends Validator<BigIntProperties> {
  validate(value: any): ValidationError[] {
    if (typeof value !== 'bigint') return [error('Value must be a bigint!')];
    const errors = validateRange(value as any, 'value', this.properties as any);
    return errors.length === 0 ? validateValidators(value, this.properties) : errors;
  }
}

export { BigIntValidator };
