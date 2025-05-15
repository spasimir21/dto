import { WrapperProperties } from '../../types/wrapper';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { getSerializer } from '../serializers';
import { Serializer } from '../Serializer';
import { DTO } from '../../DTO';

class WrapperSerializer<T extends DTO> extends Serializer<T, WrapperProperties<T>> {
  private _valueSerializer: Serializer<T> | null = null;

  get valueSerializer() {
    if (this._valueSerializer != null) return this._valueSerializer;

    const dto = typeof this.properties.value === 'function' ? this.properties.value() : this.properties.value;
    this._valueSerializer = getSerializer(dto);

    return this._valueSerializer;
  }

  write(value: T, writer: BinaryWriter): void {
    return this.valueSerializer.write(value, writer);
  }

  read(reader: BinaryReader): T {
    return this.valueSerializer.read(reader);
  }
}

export { WrapperSerializer };
