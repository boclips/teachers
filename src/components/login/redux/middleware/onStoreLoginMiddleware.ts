import { KeycloakInstance } from 'keycloak-js';
import { Store } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchLinksAction } from '../../../../app/redux/links/actions/fetchLinksAction';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { dispatchSearchVideoAction } from '../../../searchBar/redux/dispatchSearchVideoAction';
import { storeLogin } from '../actions/storeLoginAction';

const onLogin = (store: Store, keycloak: KeycloakInstance) => {
  setupAnalyticsForUser(keycloak)
    .then(() => {
      dispatchFetchLinks(store);
      dispatchSearchVideoAction(store);
    })
    .catch(error => {
      console.warn(error);
      dispatchFetchLinks(store);
      dispatchSearchVideoAction(store);
    });
};

const dispatchFetchLinks = (store: Store) => {
  store.dispatch(fetchLinksAction());
};

const userProfileIsValid = profile =>
  /* tslint:disable:no-string-literal */
  profile &&
  profile['attributes'] &&
  profile['attributes']['mixpanelDistinctId'] &&
  profile['attributes']['mixpanelDistinctId'][0];

const setupAnalyticsForUser = (keycloak: KeycloakInstance): Promise<void> => {
  const couldNotSetUpAnalyticsError = 'Could not set up analytics for user:';
  return new Promise((resolve, reject) => {
    if (!keycloak) {
      reject(`${couldNotSetUpAnalyticsError} error with keycloak`);
    }

    keycloak
      .loadUserProfile()
      .success(profile => {
        if (!userProfileIsValid(profile)) {
          reject(
            `${couldNotSetUpAnalyticsError} invalid user profile attributes`,
          );
        }

        AnalyticsFactory.getInstance().setUserId(
          profile['attributes']['mixpanelDistinctId'][0],
        );

        resolve();
      })
      .error(() => {
        reject(`${couldNotSetUpAnalyticsError} could not load user profile`);
      });
  });
};

export default sideEffect(storeLogin, onLogin);
