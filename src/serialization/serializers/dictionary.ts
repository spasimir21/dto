import { DictionaryProperties } from '../../types/dictionary';
import { LengthSerializer } from '../../mixins/length';
import { getSerializer } from '../serializers';
import { Serializer } from '../serialization';
import { string } from '../../types/string';
import { DTO } from '../../DTO';

const Key = string();

const DictionarySerializer: Serializer<Record<string, any>, DictionaryProperties<DTO>> = {
  write: (value, props, binary) => {
    LengthSerializer.write(Object.keys(value).length, { length: props.propertyCount }, binary);

    const keySerializer = getSerializer(props.key ?? Key);
    const itemSerializer = getSerializer(props.value);

    for (const key in value) {
      keySerializer.write(key, (props.key ?? Key).properties, binary);
      itemSerializer.write(value[key], props.value.properties, binary);
    }
  },
  read: (props, binary) => {
    const propertyCount = LengthSerializer.read({ length: props.propertyCount }, binary);

    const keySerializer = getSerializer(props.key ?? Key);
    const itemSerializer = getSerializer(props.value);

    const value: any = {};

    for (let i = 0; i < propertyCount; i++) {
      const key = keySerializer.read((props.key ?? Key).properties, binary);
      value[key] = itemSerializer.read(props.value.properties, binary);
    }

    return value;
  },
  size: (value, props) => {
    let size = LengthSerializer.size(Object.keys(value).length, { length: props.propertyCount });

    const keySerializer = getSerializer(props.key ?? Key);
    const itemSerializer = getSerializer(props.value);

    for (const key in value) {
      size += keySerializer.size(key, (props.key ?? Key).properties);
      size += itemSerializer.size(value[key], props.value.properties);
    }

    return size;
  }
};

export { DictionarySerializer };
