import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { validateRange } from '../../mixins/range';
import { DateProperties } from '../../types/date';

class DateValidator extends Validator<DateProperties> {
  validate(value: any): ValidationError[] {
    if (!(value instanceof Date)) return [error('Value must be a date!')];

    const errors = [
      ...validateRange(value.getTime(), 'time', this.properties),
      ...validateRange(value.getUTCFullYear(), 'year', this.properties),
      ...validateRange(value.getUTCMonth(), 'month', this.properties),
      ...validateRange(value.getUTCDate(), 'date', this.properties),
      ...validateRange(value.getUTCDay(), 'day', this.properties),
      ...validateRange(value.getUTCHours(), 'hour', this.properties),
      ...validateRange(value.getUTCMinutes(), 'minute', this.properties),
      ...validateRange(value.getUTCSeconds(), 'second', this.properties),
      ...validateRange(value.getUTCMilliseconds(), 'millis', this.properties)
    ];

    return errors.length === 0 ? validateValidators(value, this.properties) : errors;
  }
}

export { DateValidator };
