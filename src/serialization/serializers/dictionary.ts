import { DictionaryProperties } from '../../types/dictionary';
import { LengthSerializer } from '../../mixins/length';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { getSerializer } from '../serializers';
import { StringSerializer } from './string';
import { Serializer } from '../Serializer';
import { DTO, DTOType } from '../../DTO';

class DictionarySerializer<T extends DTO> extends Serializer<Record<string, DTOType<T>>, DictionaryProperties<T>> {
  readonly propertyCountSerializer = new LengthSerializer({ length: this.properties.propertyCount });

  readonly keySerializer = this.properties.key ? getSerializer(this.properties.key) : new StringSerializer({});
  readonly itemSerializer = getSerializer(this.properties.of);

  write(value: Record<string, DTOType<T>>, writer: BinaryWriter): void {
    this.propertyCountSerializer.write(Object.keys(value).length, writer);

    for (const key in value) {
      this.keySerializer.write(key, writer);
      this.itemSerializer.write(value[key], writer);
    }
  }

  read(reader: BinaryReader): Record<string, DTOType<T>> {
    const dictionary: any = {};

    const propertyCount = this.propertyCountSerializer.read(reader);
    for (let i = 0; i < propertyCount; i++) {
      const key = this.keySerializer.read(reader);
      dictionary[key] = this.itemSerializer.read(reader);
    }

    return dictionary;
  }
}

export { DictionarySerializer };
