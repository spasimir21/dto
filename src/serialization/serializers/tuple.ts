import { TupleProperties } from '../../types/tuple';
import { getSerializer } from '../serializers';
import { Serializer } from '../serialization';
import { DTO } from '../../DTO';

const TupleSerializer: Serializer<any[], TupleProperties<DTO[]>> = {
  write: (value, props, binary) => {
    for (let i = 0; i < value.length; i++)
      getSerializer(props.values[i]).write(value[i], props.values[i].properties, binary);
  },
  read: (props, binary) => {
    const value = new Array(props.values.length);

    for (let i = 0; i < props.values.length; i++)
      value[i] = getSerializer(props.values[i]).read(props.values[i].properties, binary);

    return value;
  },
  size: (value, props) => {
    let size = 0;

    for (let i = 0; i < value.length; i++)
      size += getSerializer(props.values[i]).size(value[i], props.values[i].properties);

    return size;
  }
};

export { TupleSerializer };
