import { KeycloakInstance } from 'keycloak-js';
import { Store } from 'redux';
import { sideEffect } from '../../../../redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { fetchLinksAction } from '../../../../services/links/redux/actions/fetchLinksAction';
import { dispatchSearchVideoAction } from '../../../searchBar/redux/dispatchSearchVideoAction';
import { storeLogin } from '../actions/storeLoginAction';

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
