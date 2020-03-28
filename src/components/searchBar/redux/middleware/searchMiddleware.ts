import { MiddlewareAPI } from 'redux';
import { VideoSearchFacets } from 'src/types/VideoSearchFacets';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { searchCollections } from '../../../../services/collections/searchCollections';
import fetchVideos from '../../../../services/videos/fetchVideos';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import {
  AgeRangeState,
  CollectionState,
  LinksState,
} from '../../../../types/State';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { searchCollectionsAction } from '../actions/searchCollectionsActions';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';
import { Links } from '../../../../types/Links';

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState & CollectionState & AgeRangeState>,
  searchRequest: VideoSearchRequest,
) {
  const links: Links = store.getState().links.entries;
  const facets: VideoSearchFacets = {
    ageRanges: store.getState().ageRanges,
  };

  fetchVideos(searchRequest, facets, links).then(results => {
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
