import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { fetchCollections } from '../../../../services/collections/fetchCollections';
import fetchVideos from '../../../../services/videos/fetchVideos';
import { SearchRequest } from '../../../../types/SearchRequest';
import { LinksState } from '../../../../types/State';
import { storeCollectionsAction } from '../../../collection/redux/actions/storeCollectionsAction';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeSearchResultsAction } from '../actions/storeSearchResultsAction';

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState>,
  searchRequest: SearchRequest,
) {
  const links = store.getState().links;
  Promise.all([
    fetchVideos(searchRequest, links),
    fetchCollections(links),
  ]).then(results => {
    const [searchResults, collections] = results;
    store.dispatch(storeSearchResultsAction(searchResults));
    store.dispatch(storeCollectionsAction(collections));

    AnalyticsFactory.getInstance().trackSearch(searchRequest, searchResults);
  });
}

export default sideEffect(searchVideosAction, onSearchVideos);
