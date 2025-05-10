import { error, nestError, ValidationError, Validator } from '../validator';
import { validateValidators } from '../../mixins/validators';
import { ObjectProperties } from '../../types/object';
import { isObject } from '../../utils/isObject';
import { validate } from '../validators';

const validateObject: Validator<any, ObjectProperties<any, any>> = (value, props) => {
  if (!isObject(value) || value instanceof Array) return [error('Value must be an object!')];

  if (props.strict !== false) {
    const unrecognizedKeys = new Set(Object.keys(value));
    for (const key in props.values) unrecognizedKeys.delete(key);
    if (unrecognizedKeys.size > 0)
      return [error(`Value contains unrecognized properties: ${Array.from(unrecognizedKeys).join(', ')}!`)];
  }

  const errors: ValidationError[] = [];

  for (const key in props.values) {
    if (props.optional && props.optional.includes(key) && !(key in value)) continue;
    errors.push(...validate((value as any)[key], props.values[key]).map(error => nestError(key, error)));
  }

  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateObject };
