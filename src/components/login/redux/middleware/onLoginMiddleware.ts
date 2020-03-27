import { push } from 'connected-react-router';
import { Store } from 'redux';
import { CollectionKey } from 'src/types/CollectionKey';
import { sideEffect } from '../../../../app/redux/actions';
import { storeLinksAction } from '../../../../app/redux/links/actions/storeLinksAction';
import { fetchPageableCollections } from '../../../../services/collections/fetchCollections';
import fetchLinks from '../../../../services/links/fetchLinks';
import { fetchUser } from '../../../../services/users/fetchUser';
import { UserProfile } from '../../../../services/users/UserProfile';
import { Links } from '../../../../types/Links';
import { storeCollectionsAction } from '../../../collection/redux/actions/storeCollectionsAction';
import { fetchTagsAction } from '../../../common/tags/redux/actions/fetchTagsAction';
import { fetchDisciplinesAction } from '../../../disciplines/redux/actions/fetchDisciplinesAction';
import { fetchSubjectsAction } from '../../../multipleSelect/redux/actions/fetchSubjectsAction';
import { registerUserForAnalytics } from '../actions/registerUserForAnalytics';
import { userDetailsFetched } from '../actions/userDetailsFetched';
import { userLoggedIn } from '../actions/userLoggedIn';

const onLoggedIn = (store: Store) => {
  fetchLinks(store.getState().apiPrefix)
    .then((links: Links) => {
      store.dispatch(storeLinksAction(links));
      store.dispatch(fetchSubjectsAction());
      store.dispatch(fetchTagsAction());
      store.dispatch(fetchDisciplinesAction());
      if (links.reportAccessExpired) {
        store.dispatch(push('/trial-expired'));
      }
      if (links.activate) {
        store.dispatch(push('/onboarding'));
      }
      fetchAndStorePageableCollections(store, links, 'myCollections');
      fetchAndStorePageableCollections(store, links, 'promotedCollections');

      return fetchUser(links);
    })
    .then((user: UserProfile) => {
      store.dispatch(userDetailsFetched(user));
      store.dispatch(registerUserForAnalytics(user));
    })
    .catch(error => {
      console.error(error);
    });
};

const fetchAndStorePageableCollections = (
  store: Store,
  links: Links,
  key: CollectionKey,
) =>
  fetchPageableCollections(links, { key })
    .then(collections => {
      store.dispatch(storeCollectionsAction({ collections, key }));
    })
    .catch(e => console.error('Cannot fetch collections', e));

export default sideEffect(userLoggedIn, onLoggedIn);
