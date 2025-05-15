import { error, ValidationError } from '../validation/Validator';
import { defineMixin } from '../utils/mixin';
import { isObject } from '../utils/isObject';
import { DTO } from '../DTO';

type RangeProperty = number | { min?: number; max?: number };

type RangeProperties<K extends string> = {
  [P in K]?: RangeProperty;
};

// prettier-ignore
type DTOWithRange<K extends string, T> =
  { [P in `with${Capitalize<K>}`]: (value: number) => T } &
  { [P in `withAny${Capitalize<K>}`]: () => T } &
  { [P in `with${Capitalize<K>}Range`]: (min: number, max: number) => T } &
  { [P in `withMax${Capitalize<K>}`]: (max: number) => T } &
  { [P in `withMin${Capitalize<K>}`]: (min: number) => T } &
  { [P in `withoutMax${Capitalize<K>}`]: () => T } &
  { [P in `withoutMin${Capitalize<K>}`]: () => T };

const WithRange = <K extends string, T>(key: K) => {
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

  return defineMixin<DTOWithRange<K, T>>(
    class extends DTO<any, RangeProperties<K>> {
      [`with${capitalizedKey}`](value: number) {
        return this.with({ [key]: value } as any);
      }

      [`withAny${capitalizedKey}`]() {
        return this.with({ [key]: undefined } as any);
      }

      [`with${capitalizedKey}Range`](min: number, max: number) {
        return this.with({ [key]: { min, max } } as any);
      }

      [`withMax${capitalizedKey}`](max: number) {
        return this.with({
          [key]: {
            min: isObject(this.properties[key]) ? this.properties[key].min : undefined,
            max
          }
        } as any);
      }

      [`withMin${capitalizedKey}`](min: number) {
        return this.with({
          [key]: {
            min,
            max: isObject(this.properties[key]) ? this.properties[key].max : undefined
          }
        } as any);
      }

      [`withoutMax${capitalizedKey}`]() {
        if (!isObject(this.properties[key])) return this;

        return this.with({
          [key]: {
            min: isObject(this.properties[key]) ? this.properties[key].min : undefined,
            max: undefined
          }
        } as any);
      }

      [`withoutMin${capitalizedKey}`]() {
        if (!isObject(this.properties[key])) return this;

        return this.with({
          [key]: {
            min: undefined,
            max: isObject(this.properties[key]) ? this.properties[key].max : undefined
          }
        } as any);
      }
    } as any
  );
};

const validateRange: <K extends string>(
  value: number,
  key: K,
  props: RangeProperties<K>,
  prettyKey?: string
) => ValidationError[] = (value, key, props, prettyKey) => {
  const rangeProp = props[key];
  if (rangeProp == null) return [];

  if (typeof rangeProp === 'number' || typeof rangeProp === 'bigint')
    return value === rangeProp ? [] : [error(`Value must have an exact ${prettyKey ?? key} of ${rangeProp}!`)];

  if (rangeProp.min != null && value < rangeProp.min)
    return [error(`Value must have a ${key} of at least ${rangeProp.min}!`)];

  if (rangeProp.max != null && value > rangeProp.max)
    return [error(`Value must have a ${key} of at most ${rangeProp.max}!`)];

  return [];
};

export { RangeProperty, RangeProperties, WithRange, DTOWithRange, validateRange };
