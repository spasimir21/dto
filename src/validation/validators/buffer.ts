import { validateValidators } from '../../mixins/validators';
import { BufferProperties } from '../../types/buffer';
import { validateLength } from '../../mixins/length';
import { error, Validator } from '../validator';

const validateBuffer: Validator<any, BufferProperties> = (value, props) => {
  if (!(value instanceof Uint8Array)) return [error('Value must be a buffer!')];
  const errors = validateLength(value.byteLength, props);
  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateBuffer };
