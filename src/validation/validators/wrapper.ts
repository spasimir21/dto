import { ValidationError, Validator } from '../Validator';
import { WrapperProperties } from '../../types/wrapper';
import { validate } from '../validators';
import { DTO } from '../../DTO';

class WrapperValidator<T extends DTO> extends Validator<WrapperProperties<T>> {
  private _valueDto: DTO<T> | null = null;

  get valueDto() {
    if (this._valueDto != null) return this._valueDto;

    this._valueDto = typeof this.properties.value === 'function' ? this.properties.value() : this.properties.value;

    return this._valueDto;
  }

  validate(value: any): ValidationError[] {
    return validate(value, this.valueDto);
  }
}

export { WrapperValidator };
