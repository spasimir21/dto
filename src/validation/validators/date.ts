import { validateValidators } from '../../mixins/validators';
import { validateRange } from '../../mixins/range';
import { DateProperties } from '../../types/date';
import { error, Validator } from '../validator';

const validateDate: Validator<any, DateProperties> = (value, props) => {
  if (!(value instanceof Date)) return [error('Value must be a date!')];

  const errors = [
    ...validateRange(value.getTime(), 'time', props),
    ...validateRange(value.getUTCFullYear(), 'year', props),
    ...validateRange(value.getUTCMonth(), 'month', props),
    ...validateRange(value.getUTCDate(), 'date', props),
    ...validateRange(value.getUTCDay(), 'day', props),
    ...validateRange(value.getUTCHours(), 'hour', props),
    ...validateRange(value.getUTCMinutes(), 'minute', props),
    ...validateRange(value.getUTCSeconds(), 'second', props),
    ...validateRange(value.getUTCMilliseconds(), 'millis', props)
  ];

  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateDate };
