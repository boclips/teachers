import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../redux/actions';
import { LinksState } from '../../../../redux/State';
import fetchVideos from '../../../../services/api/fetchVideos';
import { SearchRequest } from '../../../../services/types/SearchRequest';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeSearchResultsAction } from '../actions/storeSearchResultsAction';

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState>,
  searchRequest: SearchRequest,
) {
  fetchVideos(searchRequest, store.getState().links).then(videos => {
    store.dispatch(storeSearchResultsAction(videos));
  });
}
export default sideEffect(searchVideosAction, onSearchVideos);
