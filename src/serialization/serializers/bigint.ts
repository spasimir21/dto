import { BigInt64Adapter, BigUint64Adapter } from '../binary/adapters/BigIntAdapter';
import { BigIntProperties } from '../../types/bigint';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { Serializer } from '../Serializer';

const getBigIntAdapter = (value: BigIntProperties['value']) => {
  if (value == null || typeof value === 'bigint') return BigInt64Adapter;
  return value.min == null || value.min < 0n ? BigInt64Adapter : BigUint64Adapter;
};

class BigIntSerializer extends Serializer<bigint, BigIntProperties> {
  readonly adapter = getBigIntAdapter(this.properties.value);

  write(value: bigint, writer: BinaryWriter): void {
    if (typeof this.properties.value === 'bigint') return;
    writer.write(value, this.adapter);
  }

  read(reader: BinaryReader): bigint {
    if (typeof this.properties.value === 'bigint') return this.properties.value;
    return reader.read(this.adapter);
  }
}

export { BigIntSerializer };
