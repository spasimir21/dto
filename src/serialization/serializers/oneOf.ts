import { validate } from '../../validation/validators';
import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { OneOfProperties } from '../../types/oneOf';
import { getSerializer } from '../serializers';
import { NumberSerializer } from './number';
import { Serializer } from '../Serializer';
import { DTO, DTOType } from '../../DTO';

class OneOfSerializer<T extends DTO> extends Serializer<DTOType<T>, OneOfProperties<T>> {
  readonly optionSerializers = this.properties.options.map(getSerializer);

  readonly indexSerializer = new NumberSerializer({
    value: { min: 0, max: this.properties.options.length - 1 },
    int: true
  });

  getOptionIndexFor(value: DTOType<T>) {
    for (let i = 0; i < this.properties.options.length; i++) {
      const errors = validate(value, this.properties.options[i]);
      if (errors.length === 0) return i;
    }

    return -1;
  }

  write(value: DTOType<T>, writer: BinaryWriter): void {
    const index = this.getOptionIndexFor(value);

    this.indexSerializer.write(index, writer);
    this.optionSerializers[index].write(value, writer);
  }

  read(reader: BinaryReader): DTOType<T> {
    const index = this.indexSerializer.read(reader);
    return this.optionSerializers[index].read(reader);
  }
}

export { OneOfSerializer };
