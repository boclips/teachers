import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import fetchVideos from '../../../../services/videos/fetchVideos';
import { SearchRequest } from '../../../../types/SearchRequest';
import { LinksState } from '../../../../types/State';
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
