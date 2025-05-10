import { validateValidators } from '../../mixins/validators';
import { error, nestError, Validator } from '../validator';
import { validateLength } from '../../mixins/length';
import { ArrayProperties } from '../../types/array';
import { validate } from '../validators';
import { DTO } from '../../DTO';

const validateArray: Validator<any, ArrayProperties<DTO>> = (value, props) => {
  if (!(value instanceof Array)) return [error('Value must be an array!')];

  const errors = validateLength(value.length, props);
  if (errors.length > 0) return errors;

  for (let i = 0; i < value.length; i++)
    errors.push(...validate(value[i], props.of).map(error => nestError(i.toString(), error)));

  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateArray };
