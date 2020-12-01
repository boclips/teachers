import { SignUpOptions } from 'src/app/redux/authentication/middleware/requestAuthenticationMiddleware';
import { actionCreatorFactory } from '../../actions';

export const authenticationRequiredFirstTime = actionCreatorFactory<SignUpOptions>(
  'AUTHENTICATION_REQUIRED_FIRST_TIME',
);
