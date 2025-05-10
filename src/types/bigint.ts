import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { WithRange } from '../mixins/range';
import { Mixin } from '../utils/mixin';
import { deriveDTO } from '../DTO';

interface BigIntValueProperties {
  value?: bigint | { min?: bigint; max?: bigint };
}

interface DTOWithBigIntValue {
  withValue(value: bigint): this;
  withAnyValue(): this;
  withValueRange(min: bigint, max: bigint): this;
  withMaxValue(max: bigint): this;
  withMinValue(min: bigint): this;
  withoutMaxValue(): this;
  withoutMinValue(): this;
}

const WithBigIntValue = WithRange('value') as any as Mixin<DTOWithBigIntValue>;

interface BigIntProperties extends ValidatorProperties<bigint, BigIntProperties>, BigIntValueProperties {}

class BigIntDTO extends deriveDTO(WithValidators, WithBigIntValue)<bigint, BigIntProperties> {
  stringify(): string {
    return 'bigint';
  }

  export() {
    const value = this.properties.value;

    return {
      $$type: 'bigint',
      value:
        value == null
          ? undefined
          : typeof value === 'bigint'
          ? Number(value)
          : {
              min: value.min == null ? undefined : Number(value.min),
              max: value.max == null ? undefined : Number(value.max)
            }
    } as const;
  }
}

const bigint = (props: BigIntProperties = {}) => new BigIntDTO({ ...props });

export { BigIntProperties, BigIntValueProperties, BigIntDTO, bigint };
