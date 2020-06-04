import { AuthenticationOptions } from 'src/app/redux/authentication/middleware/requestAuthenticationMiddleware';
import { actionCreatorFactory } from '../../actions';

export const requestAuthentication = actionCreatorFactory<
  AuthenticationOptions
>('REQUEST_AUTHENTICATION');
