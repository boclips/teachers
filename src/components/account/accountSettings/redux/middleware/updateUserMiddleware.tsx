import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../../app/redux/actions';
import { fetchUser } from '../../../../../services/users/fetchUser';
import { UserProfile } from '../../../../../services/users/UserProfile';
import State from '../../../../../types/State';
import { userDetailsFetched } from '../../../../login/redux/actions/userDetailsFetched';
import { updateUserAction } from '../actions/updateUserAction';

const onUpdateUser = (store: MiddlewareAPI) => {
  const state: State = store.getState();

  fetchUser(state.links).then((user: UserProfile) => {
    store.dispatch(userDetailsFetched(user));
  });
};
export default sideEffect(updateUserAction, onUpdateUser);
