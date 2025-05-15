import { error, nestError, ValidationError, Validator } from '../Validator';
import { validateValidators } from '../../mixins/validators';
import { ObjectProperties } from '../../types/object';
import { isObject } from '../../utils/isObject';
import { validate } from '../validators';
import { DTO } from '../../DTO';

class ObjectValidator<T extends Record<string, DTO>, O extends keyof T> extends Validator<ObjectProperties<T, O>> {
  readonly keysSet = new Set(Object.keys(this.properties.values));
  readonly optionalSet = new Set(this.properties.optional ?? []);

  validate(value: any): ValidationError[] {
    if (!isObject(value) || value instanceof Array) return [error('Value must be an object!')];

    const errors: ValidationError[] = [];

    if (this.properties.strict !== false)
      for (const key in value)
        if (!this.keysSet.has(key)) errors.push(error(`Value contains the unrecognized property "${key}"!`));

    for (const key in this.properties.values) {
      if (this.optionalSet.has(key as any) && !(key in value)) continue;
      errors.push(...validate((value as any)[key], this.properties.values[key]).map(error => nestError(key, error)));
    }

    return errors.length === 0 ? validateValidators(value as any, this.properties) : errors;
  }
}

export { ObjectValidator };
