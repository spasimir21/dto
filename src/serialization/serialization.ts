import { ValidationError } from '../validation/validator';
import { validate } from '../validation/validators';
import { getSerializer } from './serializers';
import { DTO } from '../DTO';

interface Binary {
  buffer: Uint8Array;
  view: DataView;
  offset: number;
  size: number;
}

interface Serializer<T = any, Props = any> {
  write: (value: T, props: Props, binary: Binary) => void;
  read: (props: Props, binary: Binary) => T;
  size: (value: T, props: Props) => number;
}

type SerializationResult = { errors: []; buffer: Uint8Array } | { errors: ValidationError[]; buffer: null };

const serialize = <T>(value: T, schema: DTO<T>): SerializationResult => {
  const errors = validate(value, schema);
  if (errors.length > 0) return { errors, buffer: null };

  const serializer = getSerializer(schema);

  const size = serializer.size(value, schema.properties);
  const buffer = new Uint8Array(size);

  const binary: Binary = {
    buffer,
    view: new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength),
    offset: 0,
    size
  };

  serializer.write(value, schema.properties, binary);

  return { errors: [], buffer };
};

type DeserializationResult<T> = { errors: []; value: T } | { errors: ValidationError[]; value: null };

const deserialize = <T>(buffer: Uint8Array, schema: DTO<T>): DeserializationResult<T> => {
  const serializer = getSerializer(schema);

  const binary: Binary = {
    buffer,
    view: new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength),
    offset: 0,
    size: buffer.byteLength
  };

  const value = serializer.read(schema.properties, binary);

  const errors = validate(value, schema);
  if (errors.length > 0) return { errors, value: null };

  return { errors: [], value };
};

export { Binary, Serializer, SerializationResult, serialize, DeserializationResult, deserialize };
