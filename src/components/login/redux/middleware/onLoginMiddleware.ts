import { KeycloakInstance } from 'keycloak-js';
import { Store } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { storeLinksAction } from '../../../../app/redux/links/actions/storeLinksAction';
import { fetchPageableCollections } from '../../../../services/collections/fetchCollections';
import fetchLinks from '../../../../services/links/fetchLinks';
import activateUser from '../../../../services/users/activateUser';
import { fetchUser } from '../../../../services/users/fetchUser';
import { UserProfile } from '../../../../services/users/UserProfile';
import { Links } from '../../../../types/Links';
import { storeCollectionsAction } from '../../../collection/redux/actions/storeCollectionsAction';
import { fetchSubjectsAction } from '../../../multipleSelect/redux/actions/fetchSubjectsAction';
import { registerAnalytics } from '../actions/registerAnalytics';
import { userDetailsFetched } from '../actions/userDetailsFetched';
import { userLoggedIn } from '../actions/userLoggedIn';

const onLoggedIn = (store: Store, keycloak: KeycloakInstance) => {
  const userId = keycloak.subject;

  fetchLinks(store.getState().apiPrefix)
    .then((links: Links) => {
      store.dispatch(storeLinksAction(links));
      return links;
    })
    .then((links: Links) => {
      fetchPageableCollections(links, { key: 'myCollections' })
        .then(collections => {
          store.dispatch(
            storeCollectionsAction({ collections, key: 'myCollections' }),
          );
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
    .then(() => {
      store.dispatch(fetchSubjectsAction());
    })
    .catch(error => {
      console.warn(error);
    });
};

export default sideEffect(userLoggedIn, onLoggedIn);
