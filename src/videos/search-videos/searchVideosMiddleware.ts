import { MiddlewareAPI } from 'redux';
import { searchVideosAction } from '../../layout/TopSearchBarLayout';
import { actionCreatorFactory, sideEffect } from '../../redux/actions';
import { LinksState, SearchResults } from '../../State';
import fetchVideos from './fetchVideos';
import { SearchRequest } from './SearchRequest';

export const storeSearchResultsAction = actionCreatorFactory<SearchResults>(
  'STORE_VIDEOS',
);

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState>,
  searchRequest: SearchRequest,
) {
  fetchVideos(searchRequest, store.getState().links).then(videos => {
    store.dispatch(storeSearchResultsAction(videos));
  });
}
export default sideEffect(searchVideosAction, onSearchVideos);
