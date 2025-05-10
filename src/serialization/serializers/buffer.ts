import { LengthSerializer } from '../../mixins/length';
import { BufferProperties } from '../../types/buffer';
import { Serializer } from '../serialization';

const BufferSerializer: Serializer<Uint8Array, BufferProperties> = {
  write: (value, props, binary) => {
    LengthSerializer.write(value.byteLength, props, binary);
    binary.buffer.set(value, binary.offset);
    binary.offset += value.byteLength;
  },
  read: (props, binary) => {
    const length = LengthSerializer.read(props, binary);
    const value = binary.buffer.slice(binary.offset, binary.offset + length);
    binary.offset += length;
    return value;
  },
  size: (value, props) => LengthSerializer.size(value.byteLength, props) + value.byteLength
};

export { BufferSerializer };
