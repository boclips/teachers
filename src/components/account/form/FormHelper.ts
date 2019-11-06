import { ScreenReaderError } from '../../common/a11y/ScreenReaderErrors';

export const transformErrors = (errors: object): ScreenReaderError[] => {
  return Object.keys(errors).map(field => {
    return { field, message: errors[field].errors[0].message };
  });
};
