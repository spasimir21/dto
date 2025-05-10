import { ValidationError, Validator } from '../validation/validator';
import { DTO, DTOProperties, DTOType } from '../DTO';
import { defineMixin } from '../utils/mixin';

interface ValidatorProperties<T, Props> {
  validators?: Validator<T, Props>[];
}

interface DTOWithValidators {
  withValidator(validator: Validator<DTOType<this>, DTOProperties<this>>): this;
  withoutValidator(validator: Validator<DTOType<this>, DTOProperties<this>>): this;
}

const WithValidators = defineMixin<DTOWithValidators>(
  class extends DTO<any, ValidatorProperties<any, any>> {
    withValidator(validator: any) {
      return this.with({
        validators: [...(this.properties.validators ?? []), validator]
      } as any);
    }

    withoutValidator(validator: any) {
      return this.with({
        validators: (this.properties.validators ?? []).filter(v => v !== validator)
      } as any);
    }
  }
);

const validateValidators: Validator<any, ValidatorProperties<any, any>> = (value, props) => {
  const errors: ValidationError[] = [];
  for (const validator of props.validators ?? []) errors.push(...validator(value, props));
  return errors;
};

export { ValidatorProperties, WithValidators, DTOWithValidators, validateValidators };
