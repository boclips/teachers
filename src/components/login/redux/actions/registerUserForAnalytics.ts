import { actionCreatorFactory } from '../../../../app/redux/actions';
import { UserProfile } from '../../../../services/users/UserProfile';

export const registerUserForAnalytics = actionCreatorFactory<UserProfile>(
  'REGISTER_USER_ANALYTICS',
);
