import { BooleanProperties } from '../../types/boolean';
import { Serializer } from '../serialization';

const BooleanSerializer: Serializer<boolean, BooleanProperties> = {
  write: (value, props, binary) => {
    binary.view.setUint8(binary.offset, value === true ? 255 : 0);
    binary.offset++;
  },
  read: (props, binary) => {
    const value = binary.view.getUint8(binary.offset);
    binary.offset++;
    return value === 255;
  },
  size: (value, props) => {
    return 1;
  }
};

export { BooleanSerializer };
