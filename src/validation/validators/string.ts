import { validateValidators } from '../../mixins/validators';
import { StringProperties } from '../../types/string';
import { validateLength } from '../../mixins/length';
import { validateRange } from '../../mixins/range';
import { error, Validator } from '../validator';

const encoder = new TextEncoder();

const validateString: Validator<any, StringProperties> = (value, props) => {
  if (typeof value !== 'string') return [error('Value must be a string!')];

  const errors = [
    ...validateLength(value.length, props),
    ...validateRange(
      encoder.encode(value).byteLength,
      'byteLength' in props ? 'byteLength' : 'length',
      props,
      'byte length'
    )
  ];

  if (props.pattern != null) {
    const match = value.match(props.pattern);
    if (match == null || match[0] !== value) errors.push(error(`Value must match the pattern ${props.pattern}!`));
  }

  return errors.length === 0 ? validateValidators(value, props) : errors;
};

export { validateString };
