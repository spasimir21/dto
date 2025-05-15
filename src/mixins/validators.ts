import { ValidationError } from '../validation/Validator';
import { DTO, DTOProperties, DTOType } from '../DTO';
import { defineMixin } from '../utils/mixin';

interface ValidatorProperties<T, Props> {
  validators?: ((value: T, properties: Props) => ValidationError[])[];
}

interface DTOWithValidators {
  withValidator(validator: (value: DTOType<this>, properties: DTOProperties<this>) => ValidationError[]): this;
  withoutValidator(validator: (value: DTOType<this>, properties: DTOProperties<this>) => ValidationError[]): this;
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

const validateValidators = <T>(value: T, props: ValidatorProperties<T, any>) => {
  const errors: ValidationError[] = [];
  for (const validator of props.validators ?? []) errors.push(...validator(value, props));
  return errors;
};

export { ValidatorProperties, WithValidators, DTOWithValidators, validateValidators };
