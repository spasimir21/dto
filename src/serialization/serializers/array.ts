import { LengthSerializer } from '../../mixins/length';
import { ArrayProperties } from '../../types/array';
import { getSerializer } from '../serializers';
import { Serializer } from '../serialization';
import { DTO } from '../../DTO';

const ArraySerializer: Serializer<any[], ArrayProperties<DTO>> = {
  write: (value, props, binary) => {
    LengthSerializer.write(value.length, props, binary);

    const itemSerializer = getSerializer(props.of);
    for (const item of value) itemSerializer.write(item, props.of.properties, binary);
  },
  read: (props, binary) => {
    const length = LengthSerializer.read(props, binary);

    const itemSerializer = getSerializer(props.of);
    const value = new Array(length);

    for (let i = 0; i < length; i++) value[i] = itemSerializer.read(props.of.properties, binary);

    return value;
  },
  size: (value, props) => {
    const itemSerializer = getSerializer(props.of);

    return (
      LengthSerializer.size(value.length, props) +
      value.reduce((size, item) => size + itemSerializer.size(item, props.of.properties), 0)
    );
  }
};

export { ArraySerializer };
