import { BinaryWriter } from './binary/BinaryWriter';
import { BinaryReader } from './binary/BinaryReader';

abstract class Serializer<T = any, Props = any> {
  constructor(public readonly properties: Props) {}

  abstract write(value: T, writer: BinaryWriter): void;

  abstract read(reader: BinaryReader): T;
}

export { Serializer };
