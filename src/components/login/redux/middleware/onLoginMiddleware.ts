import { push } from 'connected-react-router';
import { Store } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { storeLinksAction } from 'src/app/redux/links/actions/storeLinksAction';
import { fetchPageableCollections } from 'src/services/collections/fetchCollections';
import fetchLinks from 'src/services/links/fetchLinks';
import { fetchUser } from 'src/services/users/fetchUser';
import { UserProfile } from 'src/services/users/UserProfile';
import { Links } from 'src/types/Links';
import { fetchTagsAction } from 'src/components/common/tags/redux/actions/fetchTagsAction';
import { userLoggedIn } from '../actions/userLoggedIn';
import { userDetailsFetched } from '../actions/userDetailsFetched';
import { registerUserForAnalytics } from '../actions/registerUserForAnalytics';
import { fetchSubjectsAction } from '../../../multipleSelect/redux/actions/fetchSubjectsAction';
import { fetchDisciplinesAction } from '../../../disciplines/redux/actions/fetchDisciplinesAction';
import { storeCollectionsAction } from '../../../collection/redux/actions/storeCollectionsAction';

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
      fetchPageableCollections(links, { key: 'myCollections' })
        .then(collections => {
          store.dispatch(
            storeCollectionsAction({ collections, key: 'myCollections' }),
          );
        })
        .catch(e => console.error('Cannot fetch collections', e));
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

export default sideEffect(userLoggedIn, onLoggedIn);
