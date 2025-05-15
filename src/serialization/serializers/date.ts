import { BinaryWriter } from '../binary/BinaryWriter';
import { BinaryReader } from '../binary/BinaryReader';
import { DateProperties } from '../../types/date';
import { BigIntSerializer } from './bigint';
import { Serializer } from '../Serializer';

class DateSerializer extends Serializer<Date, DateProperties> {
  readonly timeSerializer: BigIntSerializer;

  constructor(properties: DateProperties) {
    super(properties);

    const time = properties.time;

    this.timeSerializer = new BigIntSerializer({
      value:
        typeof time === 'number'
          ? BigInt(time)
          : {
              min: time?.min != null ? BigInt(time.min) : BigInt(0),
              max: time?.max != null ? BigInt(time.max) : undefined
            }
    });
  }

  write(value: Date, writer: BinaryWriter): void {
    const time = value.getTime();
    this.timeSerializer.write(BigInt(time), writer);
  }

  read(reader: BinaryReader): Date {
    const time = this.timeSerializer.read(reader);
    return new Date(Number(time));
  }
}

export { DateSerializer };
