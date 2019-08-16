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
import { fetchDisciplinesAction } from '../../../disciplines/redux/actions/fetchDisciplinesAction';
import { fetchSubjectsAction } from '../../../multipleSelect/redux/actions/fetchSubjectsAction';
import { fetchTagsAction } from '../../../video/tags/redux/actions/fetchTagsAction';
import { registerAnalytics } from '../actions/registerAnalytics';
import { userDetailsFetched } from '../actions/userDetailsFetched';
import { userLoggedIn } from '../actions/userLoggedIn';

const onLoggedIn = (store: Store) => {
  fetchLinks(store.getState().apiPrefix)
    .then((links: Links) => {
      store.dispatch(storeLinksAction(links));
      store.dispatch(fetchSubjectsAction());
      store.dispatch(fetchTagsAction());
      store.dispatch(fetchDisciplinesAction());
      fetchPageableCollections(links, { key: 'myCollections' })
        .then(collections => {
          store.dispatch(
            storeCollectionsAction({ collections, key: 'myCollections' }),
          );
        })
        .catch(e => console.error('Cannot fetch collections', e));
      const userProfilePromise = fetchUser(links);
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
      console.error(error);
    });
};

export default sideEffect(userLoggedIn, onLoggedIn);
