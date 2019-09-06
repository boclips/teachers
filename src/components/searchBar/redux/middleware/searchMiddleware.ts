import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import searchCollections from '../../../../services/collections/searchCollections';
import fetchVideos from '../../../../services/videos/fetchVideos';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import { CollectionState, LinksState } from '../../../../types/State';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { searchCollectionsAction } from '../actions/searchCollectionsActions';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState & CollectionState>,
  searchRequest: VideoSearchRequest,
) {
  const links = store.getState().links;
  fetchVideos(searchRequest, links).then(results => {
    store.dispatch(storeVideoSearchResultsAction(results));

    AnalyticsFactory.mixpanel().trackVideoSearch(searchRequest, results);
  });
}

export function onSearchCollections(
  store: MiddlewareAPI<any, LinksState & CollectionState>,
  searchRequest: CollectionSearchRequest,
) {
  const links = store.getState().links;
  searchCollections(searchRequest, links).then(results => {
    store.dispatch(storeCollectionSearchResultsAction(results));

    AnalyticsFactory.mixpanel().trackCollectionSearch(results);
  });
}

export default [
  sideEffect(searchVideosAction, onSearchVideos),
  sideEffect(searchCollectionsAction, onSearchCollections),
];
