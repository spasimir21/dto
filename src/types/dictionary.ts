import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { RangeProperty, WithRange } from '../mixins/range';
import { _export, deriveDTO, DTO, DTOType } from '../DTO';
import { Mixin } from '../utils/mixin';
import { string } from './string';

interface PropertyCountProperties {
  propertyCount?: RangeProperty;
}

interface DTOWithPropertyCount {
  withPropertyCount(value: number): this;
  withAnyPropertyCount(): this;
  withPropertyCountRange(min: number, max: number): this;
  withMaxPropertyCount(max: number): this;
  withMinPropertyCount(min: number): this;
  withoutMaxPropertyCount(): this;
  withoutMinPropertyCount(): this;
}

const WithPropertyCount = WithRange('propertyCount') as Mixin<DTOWithPropertyCount>;

interface DictionaryProperties<T extends DTO>
  extends ValidatorProperties<Record<string, DTOType<T>>, DictionaryProperties<T>>,
    PropertyCountProperties {
  key?: DTO<string>;
  value: T;
}

const Key = string();

class DictionaryDTO<T extends DTO> extends deriveDTO(WithValidators, WithPropertyCount)<
  Record<string, DTOType<T>>,
  DictionaryProperties<T>
> {
  withValue<U extends DTO>(value: U) {
    return (this as any as DictionaryDTO<U>).with({ value });
  }

  withKey(key: DTO<string>) {
    return this.with({ key });
  }

  stringify(): string {
    return `Dictionary<${
      this.properties.key ? this.properties.key.stringify() : 'string'
    }, ${this.properties.value.stringify()}>`;
  }

  export() {
    return {
      $$type: 'dictionary',
      propertyCount: this.properties.propertyCount,
      key: _export(this.properties.key ?? Key),
      value: _export(this.properties.value)
    } as const;
  }
}

const dictionary = <T extends DTO>(props: DictionaryProperties<T>) => new DictionaryDTO(props);

export { DictionaryProperties, DictionaryDTO, dictionary };
