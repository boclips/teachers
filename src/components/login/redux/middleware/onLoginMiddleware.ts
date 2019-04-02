import { KeycloakInstance } from 'keycloak-js';
import { Store } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchLinksAction } from '../../../../app/redux/links/actions/fetchLinksAction';
import { fetchMyCollections } from '../../../../services/collections/fetchCollections';
import fetchLinks from '../../../../services/links/fetchLinks';
import activateUser from '../../../../services/users/activateUser';
import { fetchUser } from '../../../../services/users/fetchUser';
import { UserProfile } from '../../../../services/users/UserProfile';
import { Links } from '../../../../types/Links';
import { storeCollectionsAction } from '../../../collection/redux/actions/storeCollectionsAction';
import { registerAnalytics } from '../actions/registerAnalytics';
import { userDetailsFetched } from '../actions/userDetailsFetched';
import { userLoggedIn } from '../actions/userLoggedIn';

const onLoggedIn = (store: Store, keycloak: KeycloakInstance) => {
  const userId = keycloak.subject;

  fetchLinks()
    .then((links: Links) => {
      store.dispatch(fetchLinksAction());
      return links;
    })
    .then((links: Links) => {
      fetchMyCollections(links)
        .then(collections => {
          store.dispatch(storeCollectionsAction(collections));
        })
        .catch(e => console.error('Cannot fetch collections', e));
      return links;
    })
    .then((links: Links) => {
      const userProfilePromise = fetchUser(links, userId);
      userProfilePromise.then((userProfile: UserProfile) => {
        return activateUser(links, userProfile);
      });
      return userProfilePromise;
    })
    .then((user: UserProfile) => {
      store.dispatch(userDetailsFetched(user));
      store.dispatch(registerAnalytics(user.analyticsId));
    })
    .catch(error => {
      console.warn(error);
    });
};

export default sideEffect(userLoggedIn, onLoggedIn);
