import { fromBitMask, getBitMaskLength, toBitMask } from '../../utils/bitmask';
import { ObjectDTOType, ObjectProperties } from '../../types/object';
import { BufferAdapter } from '../binary/adapters/BufferAdapter';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { mapObject } from '../../utils/mapObject';
import { getSerializer } from '../serializers';
import { Serializer } from '../Serializer';
import { DTO } from '../../DTO';

class ObjectSerializer<T extends Record<string, DTO>, O extends keyof T> extends Serializer<
  ObjectDTOType<T, O>,
  ObjectProperties<T, O>
> {
  readonly keys = Object.keys(this.properties.values).sort((a, b) => a.localeCompare(b));
  readonly valueSerializers = mapObject(this.properties.values, (_, value) => getSerializer(value));

  readonly optionalIndexMap = new Map((this.properties.optional ?? []).map((key, i) => [key, i] as const));
  readonly optionalMaskLength = getBitMaskLength(this.properties.optional?.length ?? 0);

  write(value: ObjectDTOType<T, O>, writer: BinaryWriter): void {
    // prettier-ignore
    const optionalMask = toBitMask((this.properties.optional ?? []).map(prop => prop in value && value[prop] !== undefined));
    writer.write(optionalMask, BufferAdapter);

    for (const key of this.keys) {
      if ((!(key in value) || (value as any)[key] === undefined) && this.optionalIndexMap.has(key as any)) continue;
      this.valueSerializers[key].write((value as any)[key], writer);
    }
  }

  read(reader: BinaryReader): ObjectDTOType<T, O> {
    const object: any = {};

    const optionalMask = reader.read(BufferAdapter, this.optionalMaskLength);
    const optional = fromBitMask(optionalMask, this.optionalIndexMap.size);

    for (const key of this.keys) {
      const optionalIndex = this.optionalIndexMap.get(key as any);
      if (optionalIndex != null && optional[optionalIndex] === false) continue;

      object[key] = this.valueSerializers[key].read(reader);
    }

    return object;
  }
}

export { ObjectSerializer };
