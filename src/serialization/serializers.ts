import { DictionarySerializer } from './serializers/dictionary';
import { NullableSerializer } from './serializers/nullable';
import { WrapperSerializer } from './serializers/wrapper';
import { BooleanSerializer } from './serializers/boolean';
import { BigIntSerializer } from './serializers/bigint';
import { BufferSerializer } from './serializers/buffer';
import { NumberSerializer } from './serializers/number';
import { StringSerializer } from './serializers/string';
import { ObjectSerializer } from './serializers/object';
import { ConstSerializer } from './serializers/const';
import { ArraySerializer } from './serializers/array';
import { OneOfSerializer } from './serializers/oneOf';
import { ValueSerializer } from './serializers/value';
import { TupleSerializer } from './serializers/tuple';
import { EnumSerializer } from './serializers/enum';
import { DateSerializer } from './serializers/date';
import { DictionaryDTO } from '../types/dictionary';
import { AnySerializer } from './serializers/any';
import { NullableDTO } from '../types/nullable';
import { BooleanDTO } from '../types/boolean';
import { WrapperDTO } from '../types/wrapper';
import { BigIntDTO } from '../types/bigint';
import { BufferDTO } from '../types/buffer';
import { StringDTO } from '../types/string';
import { NumberDTO } from '../types/number';
import { ObjectDTO } from '../types/object';
import { Serializer } from './Serializer';
import { TupleDTO } from '../types/tuple';
import { ValueDTO } from '../types/value';
import { OneOfDTO } from '../types/oneOf';
import { ArrayDTO } from '../types/array';
import { ConstDTO } from '../types/const';
import { DateDTO } from '../types/date';
import { EnumDTO } from '../types/enum';
import { AnyDTO } from '../types/any';
import { DTO } from '../DTO';

const $$SERIALIZER = Symbol('$$SERIALIZER');

const getSerializer = <T, Props>(dto: DTO<T, Props>): Serializer<T, Props> => {
  if ($$SERIALIZER in dto) return (dto as any)[$$SERIALIZER];

  const serializerClass = Serializers.get(dto.constructor as any) ?? AnySerializer;
  const serializer = new serializerClass(dto.properties as any);
  (dto as any)[$$SERIALIZER] = serializer;

  return serializer;
};

const Serializers = new Map<any, new (properties: any) => Serializer>();

Serializers.set(DictionaryDTO, DictionarySerializer);
Serializers.set(NullableDTO, NullableSerializer);
Serializers.set(BooleanDTO, BooleanSerializer);
Serializers.set(WrapperDTO, WrapperSerializer);
Serializers.set(BigIntDTO, BigIntSerializer);
Serializers.set(BufferDTO, BufferSerializer);
Serializers.set(NumberDTO, NumberSerializer);
Serializers.set(StringDTO, StringSerializer);
Serializers.set(ObjectDTO, ObjectSerializer);
Serializers.set(ConstDTO, ConstSerializer);
Serializers.set(ArrayDTO, ArraySerializer);
Serializers.set(OneOfDTO, OneOfSerializer);
Serializers.set(ValueDTO, ValueSerializer);
Serializers.set(TupleDTO, TupleSerializer);
Serializers.set(DateDTO, DateSerializer);
Serializers.set(EnumDTO, EnumSerializer);
Serializers.set(AnyDTO, AnySerializer);

export { getSerializer, Serializers };
