import { RangeProperty } from '../../mixins/range';
import { DateProperties } from '../../types/date';
import { Serializer } from '../serialization';
import { BigIntSerializer } from './bigint';

const convertTimePropToBigIntValue = (time?: RangeProperty) => {
  if (typeof time === 'number') return BigInt(time);

  return {
    min: time?.min != null ? BigInt(time.min) : BigInt(0),
    max: time?.max != null ? BigInt(time.max) : undefined
  };
};

const DateSerializer: Serializer<Date, DateProperties> = {
  write: (value, props, binary) =>
    BigIntSerializer.write(BigInt(value.getTime()), { value: convertTimePropToBigIntValue(props.time) }, binary),
  read: (props, binary) =>
    new Date(Number(BigIntSerializer.read({ value: convertTimePropToBigIntValue(props.time) }, binary))),
  size: (value, props) =>
    BigIntSerializer.size(BigInt(value.getTime()), { value: convertTimePropToBigIntValue(props.time) })
};

export { DateSerializer };
