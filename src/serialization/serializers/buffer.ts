import { BufferAdapter } from '../binary/adapters/BufferAdapter';
import { LengthSerializer } from '../../mixins/length';
import { BufferProperties } from '../../types/buffer';
import { BinaryReader } from '../binary/BinaryReader';
import { BinaryWriter } from '../binary/BinaryWriter';
import { Serializer } from '../Serializer';

class BufferSerializer extends Serializer<Uint8Array, BufferProperties> {
  readonly lengthSerializer = new LengthSerializer(this.properties);

  write(value: Uint8Array, writer: BinaryWriter): void {
    this.lengthSerializer.write(value.byteLength, writer);
    writer.write(value, BufferAdapter);
  }

  read(reader: BinaryReader): Uint8Array {
    const length = this.lengthSerializer.read(reader);
    return reader.read(BufferAdapter, length);
  }
}

export { BufferSerializer };
