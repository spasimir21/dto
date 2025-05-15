import { BinaryReader } from '../binary/BinaryReader';
import { BinaryWriter } from '../binary/BinaryWriter';
import { EnumProperties } from '../../types/enum';
import { NumberSerializer } from './number';
import { Serializer } from '../Serializer';

class EnumSerializer<T> extends Serializer<T, EnumProperties<T>> {
  readonly indexSerializer = new NumberSerializer({
    value: { min: 0, max: this.properties.values.length - 1 },
    int: true
  });

  readonly indexMap = new Map(this.properties.values.map((v, i) => [v, i] as const));

  write(value: T, writer: BinaryWriter): void {
    const index = this.indexMap.get(value)!;
    this.indexSerializer.write(index, writer);
  }

  read(reader: BinaryReader): T {
    const index = this.indexSerializer.read(reader);
    return this.properties.values[index];
  }
}

export { EnumSerializer };
