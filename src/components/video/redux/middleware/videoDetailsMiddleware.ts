import { Dispatch, MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import fetchVideo from '../../../../services/videos/fetchVideo';
import { LinksState } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { fetchVideoAction } from '../actions/fetchVideoAction';
import { storeVideoAction } from '../actions/storeVideoAction';
import { Links } from '../../../../types/Links';

export function onFetchVideo(
  store: MiddlewareAPI<Dispatch, LinksState>,
  videoId: string,
) {
  const links: Links = store.getState().links.entries;
  return fetchVideo(videoId, links)
    .then((video: Video) => {
      AnalyticsFactory.externalAnalytics().trackVideoVisited(video);
      return video;
    })
    .then(storeVideoAction)
    .then(store.dispatch)
    .catch(console.error);
}

export default sideEffect(fetchVideoAction, onFetchVideo);
