interface ValidationError {
  path: string[];
  message: string;
}

const error = (message: string, path: string[] = []): ValidationError => ({ path, message });

const nestError = (prop: string, error: ValidationError): ValidationError => ({
  path: [prop, ...error.path],
  message: error.message
});

abstract class Validator<Props = any> {
  constructor(public readonly properties: Props) {}

  abstract validate(value: any): ValidationError[];
}

export { ValidationError, error, nestError, Validator };
