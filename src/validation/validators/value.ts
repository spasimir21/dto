import { validateValidators } from '../../mixins/validators';
import { ValueProperties } from '../../types/value';
import { stringify } from '../../utils/stringify';
import { error, Validator } from '../validator';

const validateValue: Validator<any, ValueProperties<any>> = (value, props) =>
  props.isValid(value) ? validateValidators(value, props) : [error(`Value must be ${stringify(props.getValue())}!`)];

export { validateValue };
