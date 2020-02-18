import { Dispatch, MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import fetchVideo from 'src/services/videos/fetchVideo';
import { LinksState } from 'src/types/State';
import { Video } from 'src/types/Video';
import { Links } from 'src/types/Links';
import { storeVideoAction } from '../actions/storeVideoAction';
import { fetchVideoAction } from '../actions/fetchVideoAction';

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
