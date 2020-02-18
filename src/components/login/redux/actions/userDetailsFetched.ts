import { actionCreatorFactory } from 'src/app/redux/actions';
import { UserProfile } from 'src/services/users/UserProfile';

export const userDetailsFetched = actionCreatorFactory<UserProfile>(
  'USER_DETAILS_FETCHED',
);
