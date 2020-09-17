import { actionCreatorFactory } from '../../actions';
import { OnboardingOptions } from 'src/app/redux/authentication/middleware/requestAuthenticationMiddleware';

export const requestOnboarding = actionCreatorFactory<OnboardingOptions>(
  'REQUEST_ONBOARDING',
);
