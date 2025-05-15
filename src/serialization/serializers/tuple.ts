import { TupleDTOType, TupleProperties } from '../../types/tuple';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { getSerializer } from '../serializers';
import { Serializer } from '../Serializer';
import { DTO } from '../../DTO';

class TupleSerializer<T extends DTO[]> extends Serializer<TupleDTOType<T>, TupleProperties<T>> {
  readonly valueSerializers = this.properties.values.map(getSerializer);

  write(value: TupleDTOType<T>, writer: BinaryWriter): void {
    for (let i = 0; i < this.valueSerializers.length; i++) this.valueSerializers[i].write(value[i], writer);
  }

  read(reader: BinaryReader): TupleDTOType<T> {
    const tuple = new Array<any>(this.valueSerializers.length);
    for (let i = 0; i < this.valueSerializers.length; i++) tuple[i] = this.valueSerializers[i].read(reader);
    return tuple as any;
  }
}

export { TupleSerializer };
