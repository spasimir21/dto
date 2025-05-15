import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { BufferProperties } from '../../types/buffer';
import { validateLength } from '../../mixins/length';

class BufferValidator extends Validator<BufferProperties> {
  validate(value: any): ValidationError[] {
    if (!(value instanceof Uint8Array)) return [error('Value must be a buffer!')];
    const errors = validateLength(value.byteLength, this.properties);
    return errors.length === 0 ? validateValidators(value, this.properties) : errors;
  }
}

export { BufferValidator };
