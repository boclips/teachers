import { Reducer } from 'redux';
import { UserProfile } from 'src/services/users/UserProfile';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { userDetailsFetched } from '../actions/userDetailsFetched';

export const userDetailsFetchedReducer: Reducer<UserProfile> = createReducerWithInitialState(
  null,
  actionHandler(userDetailsFetched, (_, userProfile: UserProfile) => ({
    ...userProfile,
  })),
);
