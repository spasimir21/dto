import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { deriveDTO } from '../DTO';

interface FlagsProperties<T extends string> extends ValidatorProperties<Record<T, boolean>, FlagsProperties<T>> {
  keys: T[];
  strict?: boolean;
}

class FlagsDTO<T extends string> extends deriveDTO(WithValidators)<Record<T, boolean>, FlagsProperties<T>> {
  withKeys<U extends string>(...keys: U[]) {
    return (this as any as FlagsDTO<U>).with({ keys });
  }

  withStrict(strict: boolean = true) {
    return this.with({ strict });
  }

  stringify(): string {
    return `Flags<${this.properties.keys.join(', ')}>`;
  }

  export() {
    return {
      $$type: 'flags',
      keys: this.properties.keys,
      strict: this.properties.strict ?? true
    } as const;
  }
}

const flags = <T extends string>(props: FlagsProperties<T>) => new FlagsDTO(props);

export { FlagsProperties, FlagsDTO, flags };
