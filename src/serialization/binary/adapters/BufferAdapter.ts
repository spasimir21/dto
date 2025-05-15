import { BinaryAdapter } from '../BinaryAdapter';

const BufferAdapter: BinaryAdapter<Uint8Array, [length: number]> = {
  write: (value, binary) => {
    binary.buffer.set(value, binary.offset);
    binary.offset += value.byteLength;
  },
  read: (binary, length) => {
    const value = binary.buffer.slice(binary.offset, binary.offset + length);
    binary.offset += length;
    return value;
  },
  size: value => value.byteLength
};

export { BufferAdapter };
