import { ValueProperties } from '../../types/value';
import { Serializer } from '../serialization';

const ValueSerializer: Serializer<any, ValueProperties<any>> = {
  write: () => {},
  read: props => props.getValue(),
  size: () => 0
};

export { ValueSerializer };
