import { WrapperProperties } from '../../types/wrapper';
import { Validator } from '../validator';
import { validate } from '../validators';
import { DTO } from '../../DTO';

const validateWrapper: Validator<any, WrapperProperties<DTO>> = (value, props) => {
  const dto = typeof props.value === 'function' ? props.value() : props.value;
  return validate(value, dto);
};

export { validateWrapper };
