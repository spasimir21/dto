import { ValidatorProperties, WithValidators } from '../mixins/validators';
import { LengthProperties, WithLength } from '../mixins/length';
import { deriveDTO } from '../DTO';

interface BufferProperties extends ValidatorProperties<Uint8Array, BufferProperties>, LengthProperties {}

class BufferDTO extends deriveDTO(WithValidators, WithLength)<Uint8Array, BufferProperties> {
  stringify(): string {
    return 'buffer';
  }

  export() {
    return {
      $$type: 'buffer',
      length: this.properties.length
    } as const;
  }
}

const buffer = (props: BufferProperties = {}) => new BufferDTO(props);

export { BufferProperties, BufferDTO, buffer };
