import { validateValidators } from '../../mixins/validators';
import { BooleanProperties } from '../../types/boolean';
import { error, Validator } from '../validator';

const validateBoolean: Validator<any, BooleanProperties> = (value, props) => {
  if (typeof value !== 'boolean') return [error('Value must be a boolean!')];
  return validateValidators(value, props);
};

export { validateBoolean };
