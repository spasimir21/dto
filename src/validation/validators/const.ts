import { validateValidators } from '../../mixins/validators';
import { ConstProperties } from '../../types/const';
import { stringify } from '../../utils/stringify';
import { error, Validator } from '../validator';

const validateConst: Validator<any, ConstProperties<any>> = (value, props) =>
  value === props.value ? validateValidators(value, props) : [error(`Value must be ${stringify(props.value)}!`)];

export { validateConst };
