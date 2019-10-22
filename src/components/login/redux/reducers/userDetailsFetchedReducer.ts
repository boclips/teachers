import { Reducer } from 'redux';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { UserProfile } from '../../../../services/users/UserProfile';
import { userDetailsFetched } from '../actions/userDetailsFetched';

export const userDetailsFetchedReducer: Reducer<
  UserProfile
> = createReducerWithInitialState(
  null,
  actionHandler(userDetailsFetched, (_, userProfile: UserProfile) => ({
    ...userProfile,
  })),
);
