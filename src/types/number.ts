import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { RangeProperties, WithRange } from '../mixins/range';
import { deriveDTO } from '../DTO';

interface NumberProperties extends ValidatorProperties<number, NumberProperties>, RangeProperties<'value'> {
  int?: boolean;
  highFidelity?: boolean;
}

class NumberDTO extends deriveDTO(WithValidators, WithRange<'value', NumberDTO>('value'))<number, NumberProperties> {
  withIsInt(int: boolean = true) {
    return this.with({ int });
  }

  withHighFidelity(highFidelity: boolean = true) {
    return this.with({ highFidelity });
  }

  stringify(): string {
    return this.properties.int ? 'int' : 'float';
  }

  export() {
    return {
      $$type: 'number',
      value: this.properties.value,
      int: this.properties.int ?? false
    } as const;
  }
}

const int = (props: NumberProperties = {}) => new NumberDTO({ ...props, int: true });

const float = (props: NumberProperties = {}) => new NumberDTO(props);

export { NumberProperties, NumberDTO, int, float };
