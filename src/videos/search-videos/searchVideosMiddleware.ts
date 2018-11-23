import { MiddlewareAPI } from 'redux';
import { searchVideosAction } from '../../layout/TopSearchBarLayout';
import { actionCreatorFactory, sideEffect } from '../../redux/actions';
import { LinksState, SearchResults } from '../../State';
import searchVideos from './searchVideos';

export const storeSearchResultsAction = actionCreatorFactory<SearchResults>(
  'STORE_VIDEOS',
);

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState>,
  query: string,
) {
  searchVideos(query, store.getState().links).then(videos => {
    store.dispatch(storeSearchResultsAction(videos));
  });
}

export default sideEffect(searchVideosAction, onSearchVideos);
