import { NumberProperties } from '../../types/number';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { Serializer } from '../Serializer';
import {
  Float32Adapter,
  Float64Adapter,
  Uint16Adapter,
  Uint32Adapter,
  Uint8Adapter
} from '../binary/adapters/NumberAdapter';

const _TWO_8 = 2 ** 8;
const _TWO_16 = 2 ** 16;

const MIN = -(2 ** 31);
const MAX = 2 ** 31;

const getNumberAdapter = ({ value, highFidelity, int }: NumberProperties) => {
  if (typeof value === 'number') return Float32Adapter;

  if (!int) return highFidelity ? Float64Adapter : Float32Adapter;

  const range = (value?.max ?? MAX) - (value?.min ?? MIN);

  // prettier-ignore
  return range < _TWO_8 ? Uint8Adapter
       : range < _TWO_16 ? Uint16Adapter
       : Uint32Adapter;
};

class NumberSerializer extends Serializer<number, NumberProperties> {
  readonly min = !this.properties.int ? 0 : (this.properties.value as any)?.min ?? MIN;
  readonly adapter = getNumberAdapter(this.properties);

  write(value: number, writer: BinaryWriter): void {
    if (typeof this.properties.value === 'number') return;
    writer.write(value - this.min, this.adapter);
  }

  read(reader: BinaryReader): number {
    if (typeof this.properties.value === 'number') return this.properties.value;
    return this.min + reader.read(this.adapter);
  }
}

export { NumberSerializer };
