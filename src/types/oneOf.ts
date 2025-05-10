import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { _export, deriveDTO, DTO, DTOExport, DTOType } from '../DTO';

interface OneOfProperties<T extends DTO> extends ValidatorProperties<DTOType<T>, OneOfProperties<T>> {
  options: T[];
}

class OneOfDTO<T extends DTO> extends deriveDTO(WithValidators)<DTOType<T>, OneOfProperties<T>> {
  withOptions<U extends DTO>(options: U[]) {
    return (this as any as OneOfDTO<U>).with({ options });
  }

  stringify(): string {
    return '(' + this.properties.options.map(option => option.stringify()).join(' | ') + ')';
  }

  export() {
    return {
      $$type: 'oneOf',
      options: this.properties.options.map(_export) as DTOExport<T>[]
    };
  }
}

const oneOf = <T extends DTO>(props: OneOfProperties<T>) => new OneOfDTO(props);

export { OneOfProperties, OneOfDTO, oneOf };
