import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { stringify } from '../utils/stringify';
import { deriveDTO } from '../DTO';

interface ConstProperties<T> extends ValidatorProperties<T, ConstProperties<T>> {
  value: T;
}

class ConstDTO<T> extends deriveDTO(WithValidators)<T, ConstProperties<T>> {
  withValue<U>(value: U) {
    return (this as any as ConstDTO<U>).with({ value });
  }

  stringify(): string {
    return stringify(this.properties.value);
  }

  export() {
    return {
      $$type: 'const',
      value: this.properties.value
    } as const;
  }
}

const _const = <T>(props: ConstProperties<T>) => new ConstDTO(props);

export { ConstProperties, ConstDTO, _const };
