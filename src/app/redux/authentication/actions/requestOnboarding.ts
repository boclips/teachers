import { AuthenticationOptions } from 'src/app/redux/authentication/middleware/requestAuthenticationMiddleware';
import { actionCreatorFactory } from '../../actions';

export const requestOnboarding = actionCreatorFactory<AuthenticationOptions>(
  'REQUEST_ONBOARDING',
);
