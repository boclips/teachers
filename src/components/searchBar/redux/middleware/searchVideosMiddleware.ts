import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { fetchCollection } from '../../../../services/collections/fetchCollection';
import fetchVideos from '../../../../services/videos/fetchVideos';
import { SearchRequest } from '../../../../types/SearchRequest';
import { LinksState } from '../../../../types/State';
import { storeCollectionAction } from '../../../collection/redux/actions/storeCollectionAction';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeSearchResultsAction } from '../actions/storeSearchResultsAction';

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState>,
  searchRequest: SearchRequest,
) {
  const links = store.getState().links;
  Promise.all([fetchVideos(searchRequest, links), fetchCollection(links)]).then(
    results => {
      const [searchResults, collection] = results;
      store.dispatch(storeSearchResultsAction(searchResults));
      store.dispatch(storeCollectionAction(collection));

      AnalyticsFactory.getInstance().trackSearch(searchRequest, searchResults);
    },
  );
}

export default sideEffect(searchVideosAction, onSearchVideos);
