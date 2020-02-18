import { actionCreatorFactory } from 'src/app/redux/actions';
import { UserProfile } from 'src/services/users/UserProfile';

export const registerUserForAnalytics = actionCreatorFactory<UserProfile>(
  'REGISTER_USER_ANALYTICS',
);
