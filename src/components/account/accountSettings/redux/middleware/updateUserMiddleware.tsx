import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../../app/redux/actions';
import { fetchUser } from '../../../../../services/users/fetchUser';
import { UserProfile } from '../../../../../services/users/UserProfile';
import { userDetailsFetched } from '../../../../login/redux/actions/userDetailsFetched';
import { updateUserAction } from '../actions/updateUserAction';
import { Links } from '../../../../../types/Links';

const onUpdateUser = (store: MiddlewareAPI) => {
  const links: Links = store.getState().links.entries;

  fetchUser(links).then((user: UserProfile) => {
    store.dispatch(userDetailsFetched(user));
  });
};
export default sideEffect(updateUserAction, onUpdateUser);
