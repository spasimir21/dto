import { CombineMixins, mix, Mixin } from './utils/mixin';

const $$TYPE = Symbol('$$TYPE');
type $$TYPE = typeof $$TYPE;

interface DTOBaseExport {
  $$type: string;
}

class DTO<T = any, Props = any> {
  // Force typescript to preserve the T type parameter
  [$$TYPE]: T = null as any;

  constructor(public readonly properties: Props) {
    Object.assign(this, properties);
  }

  with(extraProperties: Partial<Props>): this {
    return new (this.constructor as any)({ ...this.properties, ...extraProperties });
  }

  stringify(): string {
    return 'unknown';
  }

  export(): DTOBaseExport {
    return { $$type: 'unknown' };
  }
}

type DTOExport<D extends DTO> = ReturnType<D['export']>;

const _export = <T extends DTO>(dto: T) => dto.export() as DTOExport<T>;

type DTOProperties<D> = D extends DTO<any, infer P> ? P : never;
type DTOType<D> = D extends DTO<infer T, any> ? T : never;

const deriveDTO = <Mixins extends Mixin<any>[]>(...mixins: Mixins) =>
  mix<new <T, Props>(props: Props) => CombineMixins<DTO<T, Props> & Props, Mixins>>(DTO, ...mixins);

export { DTO, DTOProperties, DTOType, deriveDTO, $$TYPE, DTOExport, DTOBaseExport, _export };
