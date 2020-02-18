import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { fetchUser } from 'src/services/users/fetchUser';
import { UserProfile } from 'src/services/users/UserProfile';
import { Links } from 'src/types/Links';
import { updateUserAction } from '../actions/updateUserAction';
import { userDetailsFetched } from '../../../../login/redux/actions/userDetailsFetched';

const onUpdateUser = (store: MiddlewareAPI) => {
  const links: Links = store.getState().links.entries;

  fetchUser(links).then((user: UserProfile) => {
    store.dispatch(userDetailsFetched(user));
  });
};
export default sideEffect(updateUserAction, onUpdateUser);
