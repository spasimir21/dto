import { DictionaryProperties } from '../../types/dictionary';
import { validateValidators } from '../../mixins/validators';
import { error, nestError, Validator } from '../validator';
import { validateRange } from '../../mixins/range';
import { isObject } from '../../utils/isObject';
import { string } from '../../types/string';
import { validate } from '../validators';
import { DTO } from '../../DTO';

const Key = string();

const validateDictionary: Validator<any, DictionaryProperties<DTO>> = (value, props) => {
  if (!isObject(value) || value instanceof Array) return [error(`Value must be a dictionary!`)];

  const errors = validateRange(Object.keys(value).length, 'propertyCount', props, 'property count');
  if (errors.length > 0) return errors;

  for (const key in value) {
    errors.push(
      ...validate(key, props.key ?? Key).map(error => ({
        path: [key],
        message: 'Key: ' + error.message
      }))
    );

    errors.push(...validate((value as any)[key], props.value).map(error => nestError(key, error)));
  }

  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateDictionary };
