import { Dispatch, MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import fetchVideo from '../../../../services/videos/fetchVideo';
import { LinksState } from '../../../../types/State';
import { fetchVideoAction } from '../../../../views/videoDetails/VideoDetailsView';
import { storeVideoAction } from '../actions/storeVideoAction';

export function onFetchVideo(
  store: MiddlewareAPI<Dispatch, LinksState>,
  videoId: string,
) {
  return fetchVideo(videoId, store.getState().links)
    .then(storeVideoAction)
    .then(store.dispatch);
}

export default sideEffect(fetchVideoAction, onFetchVideo);
