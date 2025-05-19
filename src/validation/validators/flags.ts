import { error, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { FlagsProperties } from '../../types/flags';
import { isObject } from '../../utils/isObject';

class FlagsValidator<T extends string> extends Validator<FlagsProperties<T>> {
  readonly keysSet = new Set(this.properties.keys);

  validate(value: any): ValidationError[] {
    if (!isObject(value) || value instanceof Array) return [error('Value must be an object!')];

    const errors: ValidationError[] = [];

    if (this.properties.strict !== false)
      for (const key in value)
        if (!this.keysSet.has(key as any)) errors.push(error(`Value contains the unrecognized property "${key}"!`));

    for (const key of this.properties.keys)
      if (typeof (value as any)[key] !== 'boolean') errors.push(error('Value must be a boolean!', [key]));

    return errors.length === 0 ? validateValidators(value as any, this.properties) : errors;
  }
}

export { FlagsValidator };
