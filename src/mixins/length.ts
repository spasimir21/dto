import { forcePositive, RangeProperty, validateRange, WithRange } from './range';
import { NumberSerializer } from '../serialization/serializers/number';
import { Serializer } from '../serialization/serialization';
import { Validator } from '../validation/validator';
import { Mixin } from '../utils/mixin';

interface LengthProperties {
  length?: RangeProperty;
}

interface DTOWithLength {
  withLength(value: number): this;
  withAnyLength(): this;
  withLengthRange(min: number, max: number): this;
  withMaxLength(max: number): this;
  withMinLength(min: number): this;
  withoutMaxLength(): this;
  withoutMinLength(): this;
}

const WithLength = WithRange('length') as Mixin<DTOWithLength>;

const validateLength: Validator<number, LengthProperties> = (length, props) => validateRange(length, 'length', props);

const LengthSerializer: Serializer<number, LengthProperties> = {
  write: (value, props, binary) =>
    NumberSerializer.write(
      value,
      {
        value: forcePositive(props.length),
        int: true
      },
      binary
    ),
  read: (props, binary) =>
    NumberSerializer.read(
      {
        value: forcePositive(props.length),
        int: true
      },
      binary
    ),
  size: (value, props) =>
    NumberSerializer.size(value, {
      value: forcePositive(props.length),
      int: true
    })
};

export { LengthProperties, DTOWithLength, WithLength, validateLength, LengthSerializer };
