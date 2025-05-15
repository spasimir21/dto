import { BinaryAdapter } from '../BinaryAdapter';

type GetBigIntType<K extends keyof DataView> = K extends `get${infer T extends string}`
  ? DataView[K] extends (byteOffset: number) => bigint
    ? T
    : never
  : never;

type BigIntType = GetBigIntType<keyof DataView>;

const createBigIntAdapter = (bigintType: BigIntType, size: number): BinaryAdapter<bigint> => ({
  write: (value, binary) => {
    binary.view[`set${bigintType}`](binary.offset, value);
    binary.offset += size;
  },
  read: binary => {
    const value = binary.view[`get${bigintType}`](binary.offset);
    binary.offset += size;
    return value;
  },
  size: () => size
});

const BigUint64Adapter = createBigIntAdapter('BigUint64', 8);
const BigInt64Adapter = createBigIntAdapter('BigInt64', 8);

export { BigUint64Adapter, BigInt64Adapter };
