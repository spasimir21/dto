import { StringProperties } from '../../types/string';
import { Serializer } from '../serialization';
import { BufferSerializer } from './buffer';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const StringSerializer: Serializer<string, StringProperties> = {
  write: (value, props, binary) =>
    BufferSerializer.write(
      encoder.encode(value),
      { length: 'byteLength' in props ? props.byteLength : props.length },
      binary
    ),
  read: (props, binary) =>
    decoder.decode(BufferSerializer.read({ length: 'byteLength' in props ? props.byteLength : props.length }, binary)),
  size: (value, props) =>
    BufferSerializer.size(encoder.encode(value), { length: 'byteLength' in props ? props.byteLength : props.length })
};

export { StringSerializer };
