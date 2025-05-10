import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { deriveDTO } from '../DTO';

interface AnyProperties<T = any> extends ValidatorProperties<T, AnyProperties> {}

class AnyDTO<T = any> extends deriveDTO(WithValidators)<T, AnyProperties<T>> {
  stringify(): string {
    return 'any';
  }

  export() {
    return { $$type: 'any' } as const;
  }
}

const any = <T = any>(props: AnyProperties = {}) => new AnyDTO<T>(props);

export { AnyProperties, AnyDTO, any };
