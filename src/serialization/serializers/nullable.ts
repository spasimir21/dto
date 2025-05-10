import { NullableProperties } from '../../types/nullable';
import { getSerializer } from '../serializers';
import { BooleanSerializer } from './boolean';
import { Serializer } from '../serialization';
import { DTO } from '../../DTO';

const NullableSerializer: Serializer<any, NullableProperties<DTO>> = {
  write: (value, props, binary) => {
    BooleanSerializer.write(value !== null, {}, binary);
    if (value !== null) getSerializer(props.value).write(value, props.value.properties, binary);
  },
  read: (props, binary) => {
    const hasValue = BooleanSerializer.read({}, binary);
    return hasValue ? getSerializer(props.value).read(props.value.properties, binary) : null;
  },
  size: (value, props) =>
    BooleanSerializer.size(value !== null, {}) +
    (value !== null ? getSerializer(props.value).size(value, props.value.properties) : 0)
};

export { NullableSerializer };
