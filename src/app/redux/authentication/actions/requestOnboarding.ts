import { OnboardingOptions } from 'src/app/redux/authentication/middleware/requestAuthenticationMiddleware';
import { actionCreatorFactory } from '../../actions';

export const requestOnboarding = actionCreatorFactory<OnboardingOptions>(
  'REQUEST_ONBOARDING',
);
