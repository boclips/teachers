import { actionCreatorFactory } from '../../../../app/redux/actions';
import { UserProfile } from '../../../../services/users/UserProfile';

export const userDetailsFetched = actionCreatorFactory<UserProfile>(
  'USER_DETAILS_FETCHED',
);
