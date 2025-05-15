import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { StringProperties } from '../../types/string';
import { BufferSerializer } from './buffer';
import { Serializer } from '../Serializer';

class StringSerializer extends Serializer<string, StringProperties> {
  readonly bufferSerializer = new BufferSerializer({
    length: 'byteLength' in this.properties ? this.properties.byteLength : this.properties.length
  });

  readonly encoder = new TextEncoder();
  readonly decoder = new TextDecoder();

  write(value: string, writer: BinaryWriter): void {
    const buffer = this.encoder.encode(value);
    this.bufferSerializer.write(buffer, writer);
  }

  read(reader: BinaryReader): string {
    const buffer = this.bufferSerializer.read(reader);
    return this.decoder.decode(buffer);
  }
}

export { StringSerializer };
