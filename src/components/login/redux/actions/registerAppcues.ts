import { actionCreatorFactory } from '../../../../app/redux/actions';
import { UserProfile } from '../../../../services/users/UserProfile';

export const registerAppcues = actionCreatorFactory<UserProfile>(
  'REGISTER_APPCUES',
);
