import { Store } from 'redux';
import { fetchLinksAction } from '../config/ConfigLoader';
import { sideEffect } from '../redux/actions';
import { storeLogin } from './PrivateRoute';

export default sideEffect(storeLogin, (store: Store) => {
  store.dispatch(fetchLinksAction());
});
