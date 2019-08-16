import { Store } from 'redux';
import { userLoggedIn } from '../../../../components/login/redux/actions/userLoggedIn';
import { sideEffect } from '../../actions';
import { authenticationChanged } from '../actions/authenticationChanged';

const onAuthenticationChange = (store: Store, { success }) => {
  if (success) {
    store.dispatch(userLoggedIn());
  }
};

export default sideEffect(authenticationChanged, onAuthenticationChange);
