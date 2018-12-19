import { KeycloakInstance } from 'keycloak-js';
import { Store } from 'redux';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import { fetchLinksAction } from '../config/ConfigLoader';
import { sideEffect } from '../redux/actions';
import { dispatchSearchVideoAction } from '../videos/search-videos/dispatchSearchVideoAction';
import { storeLogin } from './PrivateRoute';

const onLogin = (store: Store, keycloak: KeycloakInstance) => {
  dispatchFetchLinks(store);

  setupAnalyticsForUser(keycloak);

  dispatchSearchVideoAction(store);
};

const dispatchFetchLinks = (store: Store) => {
  store.dispatch(fetchLinksAction());
};

const setupAnalyticsForUser = (keycloak: KeycloakInstance) => {
  if (keycloak && keycloak.tokenParsed && keycloak.tokenParsed.sub) {
    const analytics = AnalyticsFactory.getInstance();
    analytics.setUserId(keycloak.tokenParsed.sub);
  }
};

export default sideEffect(storeLogin, onLogin);
