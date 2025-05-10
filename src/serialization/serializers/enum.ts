import { EnumProperties } from '../../types/enum';
import { Serializer } from '../serialization';
import { NumberSerializer } from './number';

const EnumSerializer: Serializer<any, EnumProperties<any>> = {
  write: (value, props, binary) =>
    NumberSerializer.write(
      props.values.indexOf(value),
      {
        value: { min: 0, max: props.values.length - 1 },
        int: true
      },
      binary
    ),
  read: (props, binary) =>
    props.values[
      NumberSerializer.read(
        {
          value: { min: 0, max: props.values.length - 1 },
          int: true
        },
        binary
      )
    ],
  size: (value, props) =>
    NumberSerializer.size(props.values.indexOf(value), {
      value: { min: 0, max: props.values.length - 1 },
      int: true
    })
};

export { EnumSerializer };
