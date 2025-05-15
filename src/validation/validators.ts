import { DictionaryValidator } from './validators/dictionary';
import { NullableValidator } from './validators/nullable';
import { BooleanValidator } from './validators/boolean';
import { WrapperValidator } from './validators/wrapper';
import { BigIntValidator } from './validators/bigint';
import { BufferValidator } from './validators/buffer';
import { NumberValidator } from './validators/number';
import { ObjectValidator } from './validators/object';
import { StringValidator } from './validators/string';
import { ArrayValidator } from './validators/array';
import { ConstValidator } from './validators/const';
import { OneOfValidator } from './validators/oneOf';
import { TupleValidator } from './validators/tuple';
import { ValueValidator } from './validators/value';
import { DictionaryDTO } from '../types/dictionary';
import { EnumValidator } from './validators/enum';
import { DateValidator } from './validators/date';
import { AnyValidator } from './validators/any';
import { NullableDTO } from '../types/nullable';
import { WrapperDTO } from '../types/wrapper';
import { BooleanDTO } from '../types/boolean';
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
import { Validator } from './Validator';
import { DateDTO } from '../types/date';
import { EnumDTO } from '../types/enum';
import { AnyDTO } from '../types/any';
import { DTO } from '../DTO';

const $$VALIDATOR = Symbol('$$VALIDATOR');

const getValidator = <Props>(dto: DTO<any, Props>): Validator<Props> => {
  if ($$VALIDATOR in dto) return (dto as any)[$$VALIDATOR];

  const validatorClass = Validators.get(dto.constructor as any) ?? AnyValidator;
  const validator = new validatorClass(dto.properties as any);
  (dto as any)[$$VALIDATOR] = validator;

  return validator;
};

const validate = (value: any, dto: DTO) => getValidator(dto).validate(value);

const Validators = new Map<new (...args: any) => DTO, new (properties: any) => Validator<any>>();

Validators.set(DictionaryDTO, DictionaryValidator);
Validators.set(NullableDTO, NullableValidator);
Validators.set(BooleanDTO, BooleanValidator);
Validators.set(WrapperDTO, WrapperValidator);
Validators.set(BigIntDTO, BigIntValidator);
Validators.set(BufferDTO, BufferValidator);
Validators.set(NumberDTO, NumberValidator);
Validators.set(ObjectDTO, ObjectValidator);
Validators.set(StringDTO, StringValidator);
Validators.set(ConstDTO, ConstValidator);
Validators.set(ArrayDTO, ArrayValidator);
Validators.set(OneOfDTO, OneOfValidator);
Validators.set(TupleDTO, TupleValidator);
Validators.set(ValueDTO, ValueValidator);
Validators.set(DateDTO, DateValidator);
Validators.set(EnumDTO, EnumValidator);
Validators.set(AnyDTO, AnyValidator);

export { Validators, getValidator, validate };
