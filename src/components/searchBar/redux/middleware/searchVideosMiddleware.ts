import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchCollection } from '../../../../services/collections/fetchCollection';
import fetchVideos from '../../../../services/videos/fetchVideos';
import { SearchRequest } from '../../../../types/SearchRequest';
import { LinksState } from '../../../../types/State';
import { storeCollectionAction } from '../../../video/redux/actions/storeCollectionAction';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeSearchResultsAction } from '../actions/storeSearchResultsAction';

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState>,
  searchRequest: SearchRequest,
) {
  const links = store.getState().links;
  Promise.all([fetchVideos(searchRequest, links), fetchCollection(links)]).then(
    results => {
      const [videos, collection] = results;
      store.dispatch(storeSearchResultsAction(videos));
      store.dispatch(storeCollectionAction(collection));
    },
  );
}

export default sideEffect(searchVideosAction, onSearchVideos);
