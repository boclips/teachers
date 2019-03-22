import { KeycloakInstance } from 'keycloak-js';
import { Store } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchLinksAction } from '../../../../app/redux/links/actions/fetchLinksAction';
import fetchLinks from '../../../../services/links/fetchLinks';
import { fetchUser } from '../../../../services/users/fetchUser';
import { Links } from '../../../../types/Links';
import { registerAnalytics } from '../actions/registerAnalytics';
import { storeLogin } from '../actions/storeLoginAction';

const onLoggedIn = (store: Store, keycloak: KeycloakInstance) => {
  const userId = keycloak.subject;

  fetchLinks()
    .then((links: Links) => {
      store.dispatch(fetchLinksAction());
      return links;
    })
    .then((links: Links) => {
      return fetchUser(links, userId);
    })
    .then(user => {
      store.dispatch(registerAnalytics(user.analyticsId));
    })
    .catch(error => {
      console.warn(error);
    });
};

export default sideEffect(storeLogin, onLoggedIn);
