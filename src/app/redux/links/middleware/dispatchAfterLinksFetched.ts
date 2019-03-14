import { Dispatch } from 'redux';
import { storeCollectionsAction } from '../../../../components/collection/redux/actions/storeCollectionsAction';
import { fetchCollections } from '../../../../services/collections/fetchCollections';

export default function initializeState(links, dispatch: Dispatch) {
  fetchCollections(links)
    .then(collections => {
      dispatch(storeCollectionsAction(collections));
    })
    .catch(() => console.error('Cannot fetch collections'));
  return links;
}
