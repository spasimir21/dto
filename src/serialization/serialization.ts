import { ValidationError } from '../validation/Validator';
import { BinaryWriter } from './binary/BinaryWriter';
import { BinaryReader } from './binary/BinaryReader';
import { validate } from '../validation/validators';
import { getSerializer } from './serializers';
import { DTO } from '../DTO';

type SerializationResult = { errors: []; buffer: Uint8Array } | { errors: ValidationError[]; buffer: null };

const serialize = <T>(value: T, schema: DTO<T>): SerializationResult => {
  const errors = validate(value, schema);
  if (errors.length > 0) return { errors, buffer: null };

  const serializer = getSerializer(schema);
  const writer = new BinaryWriter();

  serializer.write(value, writer);

  return { errors: [], buffer: writer.toBuffer() };
};

type DeserializationResult<T> = { errors: []; value: T } | { errors: ValidationError[]; value: null };

const deserialize = <T>(buffer: Uint8Array, schema: DTO<T>): DeserializationResult<T> => {
  const serializer = getSerializer(schema);

  const reader = new BinaryReader(buffer);
  const value = serializer.read(reader);

  const errors = validate(value, schema);
  if (errors.length > 0) return { errors, value: null };

  return { errors: [], value };
};

export { SerializationResult, serialize, DeserializationResult, deserialize };
