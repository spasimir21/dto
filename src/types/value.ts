import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { deriveDTO, DTOBaseExport } from '../DTO';
import { stringify } from '../utils/stringify';

interface ValueProperties<T> extends ValidatorProperties<T, ValueProperties<T>> {
  getValue: () => T;
  isValid: (value: any) => boolean;
}

class ValueDTO<T> extends deriveDTO(WithValidators)<T, ValueProperties<T>> {
  withValue<U>(getValue: () => U, isValid: (value: any) => boolean) {
    return (this as any as ValueDTO<U>).with({ getValue, isValid });
  }

  stringify(): string {
    return stringify(this.properties.getValue());
  }

  export(): DTOBaseExport {
    throw new Error('Cannot export a "value" type! Try wrapping it instead.');
  }
}

const value = <T>(props: ValueProperties<T>) => new ValueDTO(props);

export { ValueProperties, ValueDTO, value };
