import { Store } from 'redux';
import { Dispatch } from 'redux';
import { storeCollectionsAction } from '../../../../components/collection/redux/actions/storeCollectionsAction';
import { fetchUserCollections } from '../../../../services/collections/fetchCollections';
import fetchLinks from '../../../../services/links/fetchLinks';
import { sideEffect } from '../../actions';
import { fetchLinksAction } from '../actions/fetchLinksAction';
import { storeLinksAction } from '../actions/storeLinksAction';

export default sideEffect(fetchLinksAction, (store: Store) => {
  fetchLinks()
    .then(links => initializeState(links, store.dispatch))
    .then(storeLinksAction)
    .then(store.dispatch);
});

function initializeState(links, dispatch: Dispatch) {
  if (!links.profile) {
    return links;
  }

  fetchUserCollections(links)
    .then(collections => {
      dispatch(storeCollectionsAction(collections));
    })
    .catch(() => console.error('Cannot fetch collections'));

  return links;
}
