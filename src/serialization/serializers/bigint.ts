import { BigIntProperties } from '../../types/bigint';
import { Serializer } from '../serialization';

const BigIntSerializer: Serializer<bigint, BigIntProperties> = {
  write: (value, props, binary) => {
    if (typeof props.value === 'bigint') return;

    if (props.value?.min != null && props.value.min >= BigInt(0)) binary.view.setBigUint64(binary.offset, value);
    else binary.view.setBigInt64(binary.offset, value);

    binary.offset += 8;
  },
  read: (props, binary) => {
    if (typeof props.value === 'bigint') return props.value;

    let value: bigint;
    if (props.value?.min != null && props.value.min >= BigInt(0)) value = binary.view.getBigUint64(binary.offset);
    else value = binary.view.getBigInt64(binary.offset);

    binary.offset += 8;

    return value;
  },
  size: (value, props) => (typeof props.value === 'bigint' ? 0 : 8)
};

export { BigIntSerializer };
