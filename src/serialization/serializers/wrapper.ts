import { WrapperProperties } from '../../types/wrapper';
import { getSerializer } from '../serializers';
import { Serializer } from '../serialization';
import { DTO } from '../../DTO';

const WrapperSerializer: Serializer<any, WrapperProperties<DTO>> = {
  write: (value, props, binary) => {
    const dto = typeof props.value === 'function' ? props.value() : props.value;
    getSerializer(dto).write(value, dto.properties, binary);
  },
  read: (props, binary) => {
    const dto = typeof props.value === 'function' ? props.value() : props.value;
    return getSerializer(dto).read(dto.properties, binary);
  },
  size: (value, props) => {
    const dto = typeof props.value === 'function' ? props.value() : props.value;
    return getSerializer(dto).size(value, dto.properties);
  }
};

export { WrapperSerializer };
