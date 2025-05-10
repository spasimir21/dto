import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { deriveDTO } from '../DTO';

interface BooleanProperties extends ValidatorProperties<boolean, BooleanProperties> {}

class BooleanDTO extends deriveDTO(WithValidators)<boolean, BooleanProperties> {
  stringify(): string {
    return 'boolean';
  }

  export() {
    return {
      $$type: 'boolean'
    } as const;
  }
}

const boolean = (props: BooleanProperties = {}) => new BooleanDTO(props);

export { BooleanProperties, BooleanDTO, boolean };
