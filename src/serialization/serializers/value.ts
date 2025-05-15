import { BinaryReader } from '../binary/BinaryReader';
import { BinaryWriter } from '../binary/BinaryWriter';
import { ValueProperties } from '../../types/value';
import { Serializer } from '../Serializer';

class ValueSerializer<T> extends Serializer<T, ValueProperties<T>> {
  write(value: T, writer: BinaryWriter): void {}

  read(reader: BinaryReader): T {
    return this.properties.getValue();
  }
}

export { ValueSerializer };
