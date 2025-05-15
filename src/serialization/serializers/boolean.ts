import { Uint8Adapter } from '../binary/adapters/NumberAdapter';
import { BooleanProperties } from '../../types/boolean';
import { BinaryReader } from '../binary/BinaryReader';
import { BinaryWriter } from '../binary/BinaryWriter';
import { Serializer } from '../Serializer';

class BooleanSerializer extends Serializer<boolean, BooleanProperties> {
  write(value: boolean, writer: BinaryWriter): void {
    writer.write(value ? 255 : 0, Uint8Adapter);
  }

  read(reader: BinaryReader): boolean {
    return reader.read(Uint8Adapter) === 255;
  }
}

export { BooleanSerializer };
