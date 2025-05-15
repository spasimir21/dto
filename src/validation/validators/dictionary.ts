import { error, nestError, ValidationError, Validator } from '../Validator';
import { DictionaryProperties } from '../../types/dictionary';
import { validateValidators } from '../../mixins/validators';
import { validateRange } from '../../mixins/range';
import { isObject } from '../../utils/isObject';
import { string } from '../../types/string';
import { validate } from '../validators';
import { DTO } from '../../DTO';

class DictionaryValidator<T extends DTO> extends Validator<DictionaryProperties<T>> {
  readonly keyDto = this.properties.key ?? string();

  validate(value: any): ValidationError[] {
    if (!isObject(value) || value instanceof Array) return [error(`Value must be a dictionary!`)];

    const errors = validateRange(Object.keys(value).length, 'propertyCount', this.properties, 'property count');
    if (errors.length > 0) return errors;

    for (const key in value) {
      errors.push(
        ...validate(key, this.keyDto).map(error => ({
          path: [key],
          message: 'Key: ' + error.message
        }))
      );

      errors.push(...validate((value as any)[key], this.properties.of).map(error => nestError(key, error)));
    }

    return errors.length === 0 ? validateValidators(value as any, this.properties) : errors;
  }
}

export { DictionaryValidator };
