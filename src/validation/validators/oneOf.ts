import { validateValidators } from '../../mixins/validators';
import { OneOfProperties } from '../../types/oneOf';
import { error, Validator } from '../validator';
import { validate } from '../validators';
import { DTO } from '../../DTO';

const validateOneOf: Validator<any, OneOfProperties<DTO>> = (value, props) => {
  for (const option of props.options) {
    const errors = validate(value, option);
    if (errors.length === 0) return validateValidators(value, props);
  }

  return [error(`Value must be one of: ${props.options.map(option => option.stringify()).join(', ')}!`)];
};

export { validateOneOf };
