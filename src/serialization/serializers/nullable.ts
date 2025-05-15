import { NullableProperties } from '../../types/nullable';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { getSerializer } from '../serializers';
import { BooleanSerializer } from './boolean';
import { Serializer } from '../Serializer';
import { DTO, DTOType } from '../../DTO';

class NullableSerializer<T extends DTO> extends Serializer<DTOType<T> | null, NullableProperties<T>> {
  readonly valueSerializer = getSerializer(this.properties.value);
  readonly booleanSerializer = new BooleanSerializer({});

  write(value: DTOType<T>, writer: BinaryWriter): void {
    this.booleanSerializer.write(value !== null, writer);
    if (value === null) return;

    this.valueSerializer.write(value, writer);
  }

  read(reader: BinaryReader): DTOType<T> | null {
    const hasValue = this.booleanSerializer.read(reader);
    if (!hasValue) return null;

    return this.valueSerializer.read(reader);
  }
}

export { NullableSerializer };
