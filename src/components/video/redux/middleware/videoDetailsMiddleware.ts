import { Dispatch, MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import fetchVideo from '../../../../services/videos/fetchVideo';
import { LinksState } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { fetchVideoAction } from '../../../../views/videoDetails/VideoDetailsView';
import { storeVideoAction } from '../actions/storeVideoAction';

export function onFetchVideo(
  store: MiddlewareAPI<Dispatch, LinksState>,
  videoId: string,
) {
  return fetchVideo(videoId, store.getState().links)
    .then((video: Video) => {
      AnalyticsFactory.getInstance().trackVideoVisited(video);
      return video;
    })
    .then(storeVideoAction)
    .then(store.dispatch);
}

export default sideEffect(fetchVideoAction, onFetchVideo);
