import { ScreenReaderError } from '../../common/a11y/ScreenReaderErrors';

export interface ErrorField {
  name: string[];
  errors: string[];
}

export const transformErrors = (
  errorFields: ErrorField[],
): ScreenReaderError[] =>
  errorFields.map((error) => ({
    field: error.name[0],
    message: error.errors[0],
  }));
