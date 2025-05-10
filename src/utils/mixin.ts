interface Mixin<T> {
  _class: new (...args: any[]) => T;
}

type CombineMixins<T, Mixins extends Mixin<any>[]> = Mixins extends [
  infer M extends Mixin<any>,
  ...infer Extra extends Mixin<any>[]
]
  ? M extends Mixin<infer I>
    ? CombineMixins<T & I, Extra>
    : T
  : T;

const defineMixin = <T>(_class: new (...args: any[]) => T): Mixin<T> => ({ _class });

function mix<T extends new (...args: any[]) => any>(base: new (...args: any[]) => any, ...mixins: Mixin<any>[]): T {
  const _class = class extends base {};

  for (const mixin of mixins)
    for (const propName of Object.getOwnPropertyNames(mixin._class.prototype))
      Object.defineProperty(
        _class.prototype,
        propName,
        Object.getOwnPropertyDescriptor(mixin._class.prototype, propName) as any
      );

  return _class as any;
}

export { Mixin, CombineMixins, defineMixin, mix };
