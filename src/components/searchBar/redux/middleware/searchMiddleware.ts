import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { searchCollections } from 'src/services/collections/searchCollections';
import fetchVideos from 'src/services/videos/fetchVideos';
import { CollectionSearchRequest } from 'src/types/CollectionSearchRequest';
import { CollectionState, LinksState } from 'src/types/State';
import { VideoSearchRequest } from 'src/types/VideoSearchRequest';
import { Links } from 'src/types/Links';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { searchVideosAction } from '../actions/searchVideosActions';
import { searchCollectionsAction } from '../actions/searchCollectionsActions';

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState & CollectionState>,
  searchRequest: VideoSearchRequest,
) {
  const links: Links = store.getState().links.entries;
  fetchVideos(searchRequest, links).then(results => {
    store.dispatch(storeVideoSearchResultsAction(results));

    AnalyticsFactory.externalAnalytics().trackVideoSearch(results);
  });
}

export function onSearchCollections(
  store: MiddlewareAPI<any, LinksState & CollectionState>,
  searchRequest: CollectionSearchRequest,
) {
  const links: Links = store.getState().links.entries;

  searchCollections(searchRequest, links).then(results => {
    store.dispatch(storeCollectionSearchResultsAction(results));

    AnalyticsFactory.externalAnalytics().trackCollectionSearch(results);
  });
}

export default [
  sideEffect(searchVideosAction, onSearchVideos),
  sideEffect(searchCollectionsAction, onSearchCollections),
];
