import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { _export, deriveDTO, DTO, DTOType } from '../DTO';

type TupleDTOType<T extends DTO[]> = { [P in keyof T]: DTOType<T[P]> };

interface TupleProperties<T extends DTO[]> extends ValidatorProperties<TupleDTOType<T>, TupleProperties<T>> {
  values: T;
}

class TupleDTO<T extends DTO[]> extends deriveDTO(WithValidators)<TupleDTOType<T>, TupleProperties<T>> {
  withValues<U extends DTO[]>(values: U) {
    return (this as any as TupleDTO<U>).with({ values });
  }

  stringify(): string {
    return '[' + this.properties.values.map(v => v.stringify()).join(', ') + ']';
  }

  export() {
    return {
      $$type: 'tuple',
      values: this.properties.values.map(v => _export(v)) as { [P in keyof T]: DTOType<T[P]> }
    } as const;
  }
}

const tuple = <T extends DTO[]>(props: TupleProperties<T>) => new TupleDTO(props);

export { TupleProperties, TupleDTO, tuple };
