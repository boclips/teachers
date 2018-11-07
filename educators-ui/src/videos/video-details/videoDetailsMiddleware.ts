import { Dispatch, MiddlewareAPI } from 'redux';
import { actionCreatorFactory, sideEffect } from '../../redux/actions';
import { LinksState } from '../../State';
import { Video } from '../Video';
import fetchVideo from './fetchVideo';
import { fetchVideoAction } from './VideoDetailsView';

export const storeVideoAction = actionCreatorFactory<Video>('STORE_VIDEO');

export function onFetchVideo(
  store: MiddlewareAPI<Dispatch, LinksState>,
  videoId: string,
) {
  return fetchVideo(videoId, store.getState().links)
    .then(storeVideoAction)
    .then(store.dispatch);
}

export default sideEffect(fetchVideoAction, onFetchVideo);
