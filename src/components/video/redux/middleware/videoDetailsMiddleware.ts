import { Dispatch, MiddlewareAPI } from 'redux';
import { fetchVideo } from 'src/services/videos/fetchVideo';
import { sideEffect } from '../../../../app/redux/actions';
import AnalyticsFactory from '../../../../services/analytics/AnalyticsFactory';
import { LinksState } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import {
  fetchVideoAction,
  FetchVideoParams,
} from '../actions/fetchVideoAction';
import { storeVideoAction } from '../actions/storeVideoAction';

export function onFetchVideo(
  store: MiddlewareAPI<Dispatch, LinksState>,
  params: FetchVideoParams,
) {
  return fetchVideo(params)
    .then((video: Video) => {
      AnalyticsFactory.externalAnalytics().trackVideoVisited(video);
      return video;
    })
    .then((fetchedVideo) =>
      storeVideoAction({ originalId: params.id, video: fetchedVideo }),
    )
    .then(store.dispatch)
    .catch((e) => {
      console.error(e);
      store.dispatch(storeVideoAction(null));
    });
}

export default sideEffect(fetchVideoAction, onFetchVideo);
