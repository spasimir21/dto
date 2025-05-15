import { NumberSerializer } from '../serialization/serializers/number';
import { RangeProperty, validateRange, WithRange } from './range';
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

const validateLength = (length: number, props: LengthProperties) => validateRange(length, 'length', props);

class LengthSerializer extends NumberSerializer {
  constructor({ length }: LengthProperties) {
    super({
      value:
        typeof length === 'number'
          ? length
          : {
              min: length?.min ?? 0,
              max: length?.max
            },
      int: true
    });
  }
}

export { LengthProperties, DTOWithLength, WithLength, validateLength, LengthSerializer };
