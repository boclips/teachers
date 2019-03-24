import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { UserProfile } from '../../../../services/users/UserProfile';
import { userDetailsFetched } from '../actions/userDetailsFetched';

export const userDetailsFetchedReducer: Reducer<UserProfile> = createReducer(
  null,
  actionHandler(userDetailsFetched, (_, userProfile: UserProfile) => ({
    ...userProfile,
  })),
);
