import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { LengthProperties, WithLength } from '../mixins/length';
import { _export, deriveDTO, DTO, DTOType } from '../DTO';

interface ArrayProperties<T extends DTO>
  extends ValidatorProperties<DTOType<T>[], ArrayProperties<T>>,
    LengthProperties {
  of: T;
}

class ArrayDTO<T extends DTO> extends deriveDTO(WithValidators, WithLength)<DTOType<T>[], ArrayProperties<T>> {
  withOf<U extends DTO>(of: U) {
    return (this as any as ArrayDTO<U>).with({ of });
  }

  stringify(): string {
    return `${this.properties.of.stringify()}[]`;
  }

  export() {
    return {
      $$type: 'array',
      of: _export(this.properties.of),
      length: this.properties.length
    } as const;
  }
}

const array = <T extends DTO>(props: ArrayProperties<T>) => new ArrayDTO(props);

export { ArrayProperties, ArrayDTO, array };
