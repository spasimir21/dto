import { validateValidators } from '../../mixins/validators';
import { NumberProperties } from '../../types/number';
import { validateRange } from '../../mixins/range';
import { error, Validator } from '../validator';

const validateNumber: Validator<any, NumberProperties> = (value, props) => {
  if (typeof value !== 'number') return [error('Value must be a number!')];
  const errors = validateRange(value, 'value', props);
  if (props.int === true && value % 1 != 0) errors.push(error('Value must be an integer!'));
  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateNumber };
