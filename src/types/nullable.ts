import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { _export, deriveDTO, DTO, DTOType } from '../DTO';

interface NullableProperties<T extends DTO> extends ValidatorProperties<DTOType<T> | null, NullableProperties<T>> {
  value: T;
}

class NullableDTO<T extends DTO> extends deriveDTO(WithValidators)<DTOType<T> | null, NullableProperties<T>> {
  withValue<U extends DTO>(value: U) {
    return (this as any as NullableDTO<U>).with({ value });
  }

  stringify(): string {
    return `(${this.properties.value.stringify()} | null)`;
  }

  export() {
    return {
      $$type: 'nullable',
      value: _export(this.properties.value)
    } as const;
  }
}

const nullable = <T extends DTO>(props: NullableProperties<T>) => new NullableDTO(props);

export { NullableProperties, NullableDTO, nullable };
