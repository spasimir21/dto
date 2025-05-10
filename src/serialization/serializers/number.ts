import { NumberProperties } from '../../types/number';
import { Serializer } from '../serialization';

const _TWO_8 = 2 ** 8;
const _TWO_16 = 2 ** 16;

const MIN = -(2 ** 31);
const MAX = 2 ** 31;

const NumberSerializer: Serializer<number, NumberProperties> = {
  write: (value, props, binary) => {
    if (typeof props.value === 'number') return;

    if (!props.int) {
      if (props.highFidelity) {
        binary.view.setFloat64(binary.offset, value);
        binary.offset += 8;
      } else {
        binary.view.setFloat32(binary.offset, value);
        binary.offset += 4;
      }

      return;
    }

    const min = props.value?.min ?? MIN;
    const range = (props.value?.max ?? MAX) - min;

    if (range < _TWO_8) {
      binary.view.setUint8(binary.offset, value - min);
      binary.offset += 1;
    } else if (range < _TWO_16) {
      binary.view.setUint16(binary.offset, value - min);
      binary.offset += 2;
    } else {
      binary.view.setUint32(binary.offset, value - min);
      binary.offset += 4;
    }
  },
  read: (props, binary) => {
    if (typeof props.value === 'number') return props.value;

    if (!props.int) {
      let value: number;

      if (props.highFidelity) {
        value = binary.view.getFloat64(binary.offset);
        binary.offset += 8;
      } else {
        value = binary.view.getFloat32(binary.offset);
        binary.offset += 4;
      }

      return value;
    }

    const min = props.value?.min ?? MIN;
    const range = (props.value?.max ?? MAX) - min;

    let value: number;
    if (range < _TWO_8) {
      value = binary.view.getUint8(binary.offset);
      binary.offset += 1;
    } else if (range < _TWO_16) {
      value = binary.view.getUint16(binary.offset);
      binary.offset += 2;
    } else {
      value = binary.view.getUint32(binary.offset);
      binary.offset += 4;
    }

    return value + min;
  },
  size: (value, props) => {
    if (typeof props.value === 'number') return 0;
    if (!props.int) return props.highFidelity ? 8 : 4;

    const min = props.value?.min ?? MIN;
    const range = (props.value?.max ?? MAX) - min;

    // prettier-ignore
    return range < _TWO_8 ? 1
         : range < _TWO_16 ? 2
         : 4;
  }
};

export { NumberSerializer };
