import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchCollection } from '../../../../services/collections/fetchCollection';
import { LinksState } from '../../../../types/State';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { Links } from '../../../../types/Links';

export function onFetchCollection(
  store: MiddlewareAPI<any, LinksState>,
  { id, referer, shareCode },
) {
  const links: Links = store.getState().links.entries;
  fetchCollection(links, id, referer, shareCode)
    .then((collection) => {
      store.dispatch(storeCollectionAction(collection));
    })
    .catch((e) => {
      if (
        (e?.response && e.response.status === 404) ||
        e.response.status === 403
      ) {
        store.dispatch(storeCollectionAction(null));
      } else {
        console.error(e);
      }
    });
}

export default sideEffect(fetchCollectionAction, onFetchCollection);
