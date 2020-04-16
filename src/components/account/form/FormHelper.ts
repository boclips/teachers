import { ScreenReaderError } from '../../common/a11y/ScreenReaderErrors';

export const transformErrors = (errors: object): ScreenReaderError[] =>
  Object.keys(errors).map((field) => ({
    field,
    message: errors[field].errors[0].message,
  }));
