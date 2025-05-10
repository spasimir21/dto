import { validateDictionary } from './validators/dictionary';
import { ValidationError, Validator } from './validator';
import { validateNullable } from './validators/nullable';
import { validateBoolean } from './validators/boolean';
import { validateWrapper } from './validators/wrapper';
import { validateBigInt } from './validators/bigint';
import { validateBuffer } from './validators/buffer';
import { validateNumber } from './validators/number';
import { validateString } from './validators/string';
import { validateObject } from './validators/object';
import { DictionaryDTO } from '../types/dictionary';
import { validateConst } from './validators/const';
import { validateArray } from './validators/array';
import { validateOneOf } from './validators/oneOf';
import { validateValue } from './validators/value';
import { validateTuple } from './validators/tuple';
import { validateDate } from './validators/date';
import { validateEnum } from './validators/enum';
import { NullableDTO } from '../types/nullable';
import { validateAny } from './validators/any';
import { BooleanDTO } from '../types/boolean';
import { DTOWrapper } from '../types/wrapper';
import { BigIntDTO } from '../types/bigint';
import { BufferDTO } from '../types/buffer';
import { StringDTO } from '../types/string';
import { NumberDTO } from '../types/number';
import { ObjectDTO } from '../types/object';
import { TupleDTO } from '../types/tuple';
import { ValueDTO } from '../types/value';
import { OneOfDTO } from '../types/oneOf';
import { ArrayDTO } from '../types/array';
import { ConstDTO } from '../types/const';
import { DateDTO } from '../types/date';
import { EnumDTO } from '../types/enum';
import { AnyDTO } from '../types/any';
import { DTO } from '../DTO';

const validate = (value: any, schema: DTO): ValidationError[] => {
  const validator = Validators.get(schema.constructor as any);
  if (validator == null) return [];

  return validator(value, schema.properties);
};

const Validators = new Map<new (...args: any) => DTO, Validator<any, any>>();

Validators.set(DictionaryDTO, validateDictionary);
Validators.set(NullableDTO, validateNullable);
Validators.set(BooleanDTO, validateBoolean);
Validators.set(DTOWrapper, validateWrapper);
Validators.set(BigIntDTO, validateBigInt);
Validators.set(BufferDTO, validateBuffer);
Validators.set(NumberDTO, validateNumber);
Validators.set(StringDTO, validateString);
Validators.set(ObjectDTO, validateObject);
Validators.set(ConstDTO, validateConst);
Validators.set(ArrayDTO, validateArray);
Validators.set(OneOfDTO, validateOneOf);
Validators.set(ValueDTO, validateValue);
Validators.set(TupleDTO, validateTuple);
Validators.set(DateDTO, validateDate);
Validators.set(EnumDTO, validateEnum);
Validators.set(AnyDTO, validateAny);

export { Validators, validate };
