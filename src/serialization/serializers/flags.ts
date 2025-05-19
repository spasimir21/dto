import { fromBitMask, getBitMaskLength, toBitMask } from '../../utils/bitmask';
import { BufferAdapter } from '../binary/adapters/BufferAdapter';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { FlagsProperties } from '../../types/flags';
import { BooleanSerializer } from './boolean';
import { Serializer } from '../Serializer';

class FlagsSerializer<T extends string> extends Serializer<Record<T, boolean>, FlagsProperties<T>> {
  readonly keys = this.properties.keys.sort((a, b) => a.localeCompare(b));
  readonly booleanSerializer = new BooleanSerializer({});

  readonly maskLength = getBitMaskLength(this.keys.length);

  write(value: Record<T, boolean>, writer: BinaryWriter): void {
    const mask = toBitMask(this.keys.map(key => value[key]));
    writer.write(mask, BufferAdapter);
  }

  read(reader: BinaryReader): Record<T, boolean> {
    const flags: any = {};

    const mask = reader.read(BufferAdapter, this.maskLength);
    const flatFlags = fromBitMask(mask, this.keys.length);

    for (let i = 0; i < flatFlags.length; i++) flags[this.keys[i]] = flatFlags[i];

    return flags;
  }
}

export { FlagsSerializer };
