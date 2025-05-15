import { _export, deriveDTO, DTO, DTOType } from '../DTO';

interface WrapperProperties<T extends DTO> {
  name?: string;
  value: T | (() => T);
}

class WrapperDTO<T extends DTO> extends deriveDTO()<DTOType<T>, WrapperProperties<T>> {
  withValue<U extends DTO>(value: U | (() => U)) {
    return (this as any as WrapperDTO<U>).with({ value });
  }

  withName(name: string) {
    return this.with({ name });
  }

  withoutName() {
    return this.with({ name: undefined });
  }

  stringify(): string {
    if (this.properties.name) return this.properties.name;
    const dto = typeof this.properties.value === 'function' ? this.properties.value() : this.properties.value;
    return dto.stringify();
  }

  export() {
    if (this.properties.name == null)
      return _export(typeof this.properties.value === 'function' ? this.properties.value() : this.properties.value);

    return { $$type: this.properties.name } as const;
  }
}

const wrap = <T extends DTO>(props: WrapperProperties<T>) => new WrapperDTO(props);

export { WrapperProperties, WrapperDTO, wrap };
