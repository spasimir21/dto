import { validateValidators } from '../../mixins/validators';
import { AnyProperties } from '../../types/any';
import { Validator } from '../validator';

const validateAny: Validator<any, AnyProperties> = validateValidators;

export { validateAny };
