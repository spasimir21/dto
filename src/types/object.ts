import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { _export, deriveDTO, DTO, DTOExport, DTOType } from '../DTO';
import { mapObject } from '../utils/mapObject';
import { omit } from '../utils/omit';
import { pick } from '../utils/pick';

type ObjectDTOType<T extends Record<string, DTO>, O extends keyof T> = {
  [P in Exclude<keyof T, O>]: DTOType<T[P]>;
} & {
  [P in O]?: DTOType<T[P]>;
};

interface ObjectProperties<T extends Record<string, DTO>, O extends keyof T>
  extends ValidatorProperties<ObjectDTOType<T, O>, ObjectProperties<T, O>> {
  values: T;
  optional?: O[];
  strict?: boolean;
}

class ObjectDTO<T extends Record<string, DTO>, O extends keyof T> extends deriveDTO(WithValidators)<
  ObjectDTOType<T, O>,
  ObjectProperties<T, O>
> {
  withValues<U extends Record<string, DTO>>(values: U) {
    return (this as any as ObjectDTO<T & U, O>).with({
      values: { ...this.properties.values, ...values }
    });
  }

  withoutValues<K extends keyof T>(...keys: K[]) {
    return (this as any as ObjectDTO<Omit<T, K>, Exclude<O, K>>).with({
      values: omit(this.properties.values, ...keys),
      optional: (this.properties.optional ?? []).filter(k => !keys.includes(k as any)) as any
    });
  }

  withOnly<K extends keyof T>(...keys: K[]) {
    return (this as any as ObjectDTO<Pick<T, K>, K & O>).with({
      values: pick(this.properties.values, ...keys),
      optional: (this.properties.optional ?? []).filter(k => keys.includes(k as any)) as any
    });
  }

  withOptional<V extends keyof T>(...keys: V[]) {
    return (this as any as ObjectDTO<T, O | V>).with({
      optional: [...(this.properties.optional ?? []), ...keys] as any
    });
  }

  withRequired<V extends keyof T>(...keys: V[]) {
    return (this as any as ObjectDTO<T, Exclude<O, V>>).with({
      optional: (this.properties.optional ?? []).filter(k => !keys.includes(k as any)) as any
    });
  }

  withStrict(strict: boolean = true) {
    return this.with({ strict });
  }

  stringify(): string {
    let string = '{\n';

    for (const [key, value] of Object.entries(this.properties.values)) {
      const isOptional = (this.properties.optional ?? []).includes(key as any);
      string += `  ${key}${isOptional ? '?' : ''}: `;
      string += value.stringify().replace(/\n/g, '\n  ');
      string += ';\n';
    }

    string += '}';
    return string;
  }

  export() {
    return {
      $$type: 'object',
      values: mapObject(this.properties.values, (_, v) => _export(v)) as { [P in keyof T]: DTOExport<T[P]> },
      optional: this.properties.optional,
      strict: this.properties.strict ?? true
    } as const;
  }
}

const object = <T extends Record<string, DTO>, O extends keyof T = never>(
  props: ObjectProperties<T, O>
): ObjectDTO<T, O> => new ObjectDTO(props) as any;

export { ObjectProperties, ObjectDTO, object };
