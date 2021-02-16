import { MiddlewareAPI } from 'redux';
import { VideoSearchFacets } from 'src/types/VideoSearchFacets';
import { VideoSearchResult } from 'src/types/SearchResults';
import { sideEffect } from '../../../../app/redux/actions';
import { searchCollections } from '../../../../services/collections/searchCollections';
import fetchVideos from '../../../../services/videos/fetchVideos';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import State, { CollectionState, LinksState } from '../../../../types/State';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { searchCollectionsAction } from '../actions/searchCollectionsActions';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';
import { Links } from '../../../../types/Links';

export function onSearchVideos(
  store: MiddlewareAPI<any, State>,
  searchRequest: VideoSearchRequest,
) {
  const facets: VideoSearchFacets = {
    ageRanges: store.getState().ageRanges,
    durations: store.getState().durations,
    resourceTypes: store.getState().resourceTypes,
  };

  fetchVideos(searchRequest, facets).then((result: VideoSearchResult) => {
    store.dispatch(storeVideoSearchResultsAction(result));
  });
}

export function onSearchCollections(
  store: MiddlewareAPI<any, LinksState & CollectionState>,
  searchRequest: CollectionSearchRequest,
) {
  const links: Links = store.getState().links.entries;

  searchCollections(searchRequest, links).then((results) => {
    store.dispatch(storeCollectionSearchResultsAction(results));
  });
}

export default [
  sideEffect(searchVideosAction, onSearchVideos),
  sideEffect(searchCollectionsAction, onSearchCollections),
];
