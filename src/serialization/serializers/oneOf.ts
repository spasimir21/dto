import { validate } from '../../validation/validators';
import { OneOfProperties } from '../../types/oneOf';
import { getSerializer } from '../serializers';
import { Serializer } from '../serialization';
import { NumberSerializer } from './number';
import { DTO } from '../../DTO';

const OneOfSerializer: Serializer<any, OneOfProperties<DTO>> = {
  write: (value, props, binary) => {
    let index: number = 0;
    for (let i = 0; i < props.options.length; i++) {
      const errors = validate(value, props.options[i]);
      if (errors.length > 0) continue;

      index = i;
      break;
    }

    NumberSerializer.write(
      index,
      {
        value: { min: 0, max: props.options.length - 1 },
        int: true
      },
      binary
    );

    getSerializer(props.options[index]).write(value, props.options[index].properties, binary);
  },
  read: (props, binary) => {
    const index = NumberSerializer.read(
      {
        value: { min: 0, max: props.options.length - 1 },
        int: true
      },
      binary
    );

    return getSerializer(props.options[index]).read(props.options[index].properties, binary);
  },
  size: (value, props) => {
    let index: number = 0;
    for (let i = 0; i < props.options.length; i++) {
      const errors = validate(value, props.options[i]);
      if (errors.length > 0) continue;

      index = i;
      break;
    }

    return (
      NumberSerializer.size(index, {
        value: { min: 0, max: props.options.length - 1 },
        int: true
      }) + getSerializer(props.options[index]).size(value, props.options[index].properties)
    );
  }
};

export { OneOfSerializer };
