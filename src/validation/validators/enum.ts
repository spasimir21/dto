import { validateValidators } from '../../mixins/validators';
import { EnumProperties } from '../../types/enum';
import { error, Validator } from '../validator';

const validateEnum: Validator<any, EnumProperties<any>> = (value, props) => {
  if (!props.values.includes(value)) return [error(`Value must be one of the following: ${props.values.join(', ')}!`)];
  return validateValidators(value, props);
};

export { validateEnum };
