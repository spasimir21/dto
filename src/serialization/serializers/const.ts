import { BinaryReader } from '../binary/BinaryReader';
import { BinaryWriter } from '../binary/BinaryWriter';
import { ConstProperties } from '../../types/const';
import { Serializer } from '../Serializer';

class ConstSerializer<T> extends Serializer<T, ConstProperties<T>> {
  write(value: T, writer: BinaryWriter): void {}

  read(reader: BinaryReader): T {
    return this.properties.value;
  }
}

export { ConstSerializer };
