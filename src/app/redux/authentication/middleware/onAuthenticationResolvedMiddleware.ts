import { Store } from 'redux';
import { userLoggedIn } from '../../../../components/login/redux/actions/userLoggedIn';
import { sideEffect } from '../../actions';
import { authenticationResolved } from '../actions/authenticationResolved';

const onAuthenticationResolved = (store: Store, { success }) => {
  if (success) {
    store.dispatch(userLoggedIn());
  }
};

export default sideEffect(authenticationResolved, onAuthenticationResolved);
