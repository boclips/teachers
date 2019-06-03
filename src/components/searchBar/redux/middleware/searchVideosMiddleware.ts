import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import fetchVideos from '../../../../services/videos/fetchVideos';
import { CollectionState, LinksState } from '../../../../types/State';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeSearchResultsAction } from '../actions/storeSearchResultsAction';

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState & CollectionState>,
  searchRequest: VideoSearchRequest,
) {
  const links = store.getState().links;
  fetchVideos(searchRequest, links).then(results => {
    store.dispatch(storeSearchResultsAction(results));

    AnalyticsFactory.getInstance().trackSearch(searchRequest, results);
  });
}

export default sideEffect(searchVideosAction, onSearchVideos);
