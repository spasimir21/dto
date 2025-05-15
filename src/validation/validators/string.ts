import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { StringProperties } from '../../types/string';
import { validateLength } from '../../mixins/length';
import { validateRange } from '../../mixins/range';

class StringValidator extends Validator<StringProperties> {
  readonly encoder = new TextEncoder();

  validate(value: any): ValidationError[] {
    if (typeof value !== 'string') return [error('Value must be a string!')];

    const errors = [
      ...validateLength(value.length, this.properties),
      ...validateRange(
        this.encoder.encode(value).byteLength,
        'byteLength' in this.properties ? 'byteLength' : 'length',
        this.properties,
        'byte length'
      )
    ];

    if (this.properties.pattern != null) {
      const match = value.match(this.properties.pattern);

      if (match == null || match[0] !== value)
        errors.push(error(`Value must match the pattern ${this.properties.pattern}!`));
    }

    return errors.length === 0 ? validateValidators(value, this.properties) : errors;
  }
}

export { StringValidator };
