import { error, nestError, ValidationError, Validator } from '../validator';
import { validateValidators } from '../../mixins/validators';
import { TupleProperties } from '../../types/tuple';
import { validate } from '../validators';
import { DTO } from '../../DTO';

const validateTuple: Validator<any, TupleProperties<DTO[]>> = (value, props) => {
  if (!(value instanceof Array)) return [error('Value must be a tuple!')];

  if (value.length !== props.values.length)
    return [error(`Value must have a length of exactly ${props.values.length}!`)];

  const errors: ValidationError[] = [];

  for (let i = 0; i < props.values.length; i++)
    errors.push(...validate(value[i], props.values[i]).map(error => nestError(i.toString(), error)));

  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateTuple };
