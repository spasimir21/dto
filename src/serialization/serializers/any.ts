import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { AnyProperties } from '../../types/any';
import { StringSerializer } from './string';
import { Serializer } from '../Serializer';

class AnySerializer<T = any> extends Serializer<T, AnyProperties<T>> {
  readonly stringSerializer = new StringSerializer({});

  write(value: any, writer: BinaryWriter): void {
    const string = JSON.stringify(value);
    this.stringSerializer.write(string, writer);
  }

  read(reader: BinaryReader) {
    const string = this.stringSerializer.read(reader);
    return JSON.parse(string);
  }
}

export { AnySerializer };
