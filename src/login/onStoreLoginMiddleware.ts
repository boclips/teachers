import { KeycloakInstance } from 'keycloak-js';
import { Store } from 'redux';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import { fetchLinksAction } from '../config/ConfigLoader';
import { sideEffect } from '../redux/actions';
import { storeLogin } from './PrivateRoute';

export default sideEffect(
  storeLogin,
  (store: Store, keycloak: KeycloakInstance) => {
    store.dispatch(fetchLinksAction());
    if (keycloak && keycloak.tokenParsed && keycloak.tokenParsed.sub) {
      const analytics = AnalyticsFactory.getInstance();
      analytics.setUserId(keycloak.tokenParsed.sub);
    }
  },
);
