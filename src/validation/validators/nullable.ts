import { validateValidators } from '../../mixins/validators';
import { NullableProperties } from '../../types/nullable';
import { Validator } from '../validator';
import { validate } from '../validators';
import { DTO } from '../../DTO';

const validateNullable: Validator<any, NullableProperties<DTO>> = (value, props) => {
  if (value === null) return [];
  const errors = validate(value, props.value);
  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateNullable };
