import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { LengthProperties, WithLength } from '../mixins/length';
import { RangeProperties, WithRange } from '../mixins/range';
import { deriveDTO } from '../DTO';

interface StringProperties
  extends ValidatorProperties<string, StringProperties>,
    LengthProperties,
    RangeProperties<'byteLength'> {
  pattern?: RegExp;
}

class StringDTO extends deriveDTO(WithValidators, WithLength, WithRange<'byteLength', StringDTO>('byteLength'))<
  string,
  StringProperties
> {
  withPattern(pattern: RegExp) {
    return this.with({ pattern });
  }

  withoutPattern() {
    return this.with({ pattern: undefined });
  }

  stringify(): string {
    return this.properties.pattern ? `string<${String(this.properties.pattern)}>` : 'string';
  }

  export() {
    return {
      $$type: 'string',
      length: this.properties.length,
      byteLength: this.properties.byteLength,
      pattern: this.properties.pattern ? String(this.properties.pattern) : undefined
    } as const;
  }
}

const string = (props: StringProperties = {}) => new StringDTO(props);

export { StringProperties, StringDTO, string };
