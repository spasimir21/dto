import { BinaryAdapter } from '../BinaryAdapter';

type GetNumberType<K extends keyof DataView> = K extends `get${infer T extends string}`
  ? DataView[K] extends (byteOffset: number) => number
    ? T
    : never
  : never;

type NumberType = GetNumberType<keyof DataView>;

const createNumberAdapter = (numberType: NumberType, size: number): BinaryAdapter<number> => ({
  write: (value, binary) => {
    binary.view[`set${numberType}`](binary.offset, value);
    binary.offset += size;
  },
  read: binary => {
    const value = binary.view[`get${numberType}`](binary.offset);
    binary.offset += size;
    return value;
  },
  size: () => size
});

const Uint32Adapter = createNumberAdapter('Uint32', 4);
const Uint16Adapter = createNumberAdapter('Uint16', 2);
const Uint8Adapter = createNumberAdapter('Uint8', 1);

const Float64Adapter = createNumberAdapter('Float64', 8);
const Float32Adapter = createNumberAdapter('Float32', 4);

export { Uint32Adapter, Uint16Adapter, Uint8Adapter, Float64Adapter, Float32Adapter };
