import { Store } from 'redux';
import activateUser from '../../../../services/users/userActivator';
import { Links } from '../../../../types/Links';
import { LoginState } from '../../../../types/State';
import { sideEffect } from '../../actions';
import { storeLinksAction } from '../actions/storeLinksAction';

export default sideEffect(
  storeLinksAction,
  (storeWithLogin: Store<LoginState>, links: Links) => {
    activateUser(links, storeWithLogin.getState().user);
  },
);
