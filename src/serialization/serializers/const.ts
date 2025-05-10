import { ConstProperties } from '../../types/const';
import { Serializer } from '../serialization';

const ConstSerializer: Serializer<any, ConstProperties<any>> = {
  write: () => {},
  read: props => props.value,
  size: () => 0
};

export { ConstSerializer };
