import { BigIntProperties, BigIntValueProperties } from '../../types/bigint';
import { validateValidators } from '../../mixins/validators';
import { validateRange } from '../../mixins/range';
import { error, Validator } from '../validator';

const validateBigIntValue: Validator<bigint, BigIntValueProperties> = (value, props) =>
  validateRange(value as any, 'Value', props as any);

const validateBigInt: Validator<any, BigIntProperties> = (value, props) => {
  if (typeof value !== 'bigint') return [error('Value must be a bigint!')];
  const errors = validateBigIntValue(value, props);
  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateBigInt };
