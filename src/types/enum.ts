import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { deriveDTO } from '../DTO';

interface EnumProperties<T> extends ValidatorProperties<T, EnumProperties<T>> {
  values: T[];
}

class EnumDTO<T> extends deriveDTO(WithValidators)<T, EnumProperties<T>> {
  withValues<U>(values: U[]) {
    return (this as any as EnumDTO<U>).with({ values });
  }

  stringify(): string {
    return '(' + this.properties.values.map(v => JSON.stringify(v)).join(' | ') + ')';
  }

  export() {
    return {
      $$type: 'enum',
      values: this.properties.values
    } as const;
  }
}

const _enum = <T>(props: EnumProperties<T>) => new EnumDTO(props);

export { EnumProperties, EnumDTO, _enum };
