import { Dispatch, MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../redux/actions';
import { LinksState } from '../../../../redux/State';
import fetchVideo from '../../../../services/api/fetchVideo';
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
