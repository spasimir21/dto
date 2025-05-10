import { fromBitMask, getBitMaskLength, toBitMask } from '../../utils/bitmask';
import { ObjectProperties } from '../../types/object';
import { getSerializer } from '../serializers';
import { Serializer } from '../serialization';
import { DTO } from '../../DTO';

const ObjectSerializer: Serializer<any, ObjectProperties<Record<string, DTO>, string>> = {
  write: (value, props, binary) => {
    const optionalMask = toBitMask((props.optional ?? []).map(prop => prop in value && value[prop] !== undefined));
    for (const byte of optionalMask) {
      binary.view.setUint8(binary.offset, byte);
      binary.offset++;
    }

    for (const key in props.values) {
      if (!(key in value) || value[key] === undefined) continue;
      getSerializer(props.values[key]).write(value[key], props.values[key].properties, binary);
    }
  },
  read: (props, binary) => {
    const optionalMask = new Array<number>(getBitMaskLength(props.optional?.length ?? 0));

    for (let i = 0; i < optionalMask.length; i++) {
      optionalMask[i] = binary.view.getUint8(binary.offset);
      binary.offset++;
    }

    const optional = fromBitMask(optionalMask, props.optional?.length ?? 0);
    const value: any = {};

    for (const key in props.values) {
      const optionalIndex = props.optional ? props.optional.indexOf(key) : -1;
      if (optionalIndex >= 0 && optional[optionalIndex] === false) continue;

      value[key] = getSerializer(props.values[key]).read(props.values[key].properties, binary);
    }

    return value;
  },
  size: (value, props) => {
    let size = getBitMaskLength(props.optional?.length ?? 0);

    for (const key in props.values) {
      if (!(key in value) || value[key] === undefined) continue;
      size += getSerializer(props.values[key]).size(value[key], props.values[key].properties);
    }

    return size;
  }
};

export { ObjectSerializer };
