import { LengthSerializer } from '../../mixins/length';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { ArrayProperties } from '../../types/array';
import { getSerializer } from '../serializers';
import { Serializer } from '../Serializer';
import { DTO, DTOType } from '../../DTO';

class ArraySerializer<T extends DTO> extends Serializer<DTOType<T>[], ArrayProperties<T>> {
  readonly lengthSerializer = new LengthSerializer(this.properties);
  readonly itemSerializer = getSerializer(this.properties.of);

  write(value: DTOType<T>[], writer: BinaryWriter): void {
    this.lengthSerializer.write(value.length, writer);
    for (const item of value) this.itemSerializer.write(item, writer);
  }

  read(reader: BinaryReader): DTOType<T>[] {
    const length = this.lengthSerializer.read(reader);
    const array = new Array<DTOType<T>>(length);

    for (let i = 0; i < length; i++) array[i] = this.itemSerializer.read(reader);

    return array;
  }
}

export { ArraySerializer };
