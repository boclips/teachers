import { MiddlewareAPI } from 'redux';
import { actionCreatorFactory, sideEffect } from '../../redux/actions';
import { LinksState, SearchResults, UserState } from '../../State';
import { searchVideosAction } from '../SearchLayout';
import searchVideos from './searchVideos';

export const storeSearchResultsAction = actionCreatorFactory<SearchResults>(
  'STORE_VIDEOS',
);

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState & UserState>,
  query: string,
) {
  searchVideos(query, store.getState().links).then(videos => {
    store.dispatch(storeSearchResultsAction(videos));
  });
}

export default sideEffect(searchVideosAction, onSearchVideos);
