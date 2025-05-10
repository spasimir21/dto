interface ValidationError {
  path: string[];
  message: string;
}

const error = (message: string, path: string[] = []): ValidationError => ({ path, message });

const nestError = (prop: string, error: ValidationError): ValidationError => ({
  path: [prop, ...error.path],
  message: error.message
});

type Validator<T, Props> = (value: T, properties: Props) => ValidationError[];

export { ValidationError, error, nestError, Validator };
