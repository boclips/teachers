import { Reducer } from 'redux';
import createReducer, { actionHandler } from '../redux/createReducer';
import { VideosStateValue } from '../State';
import { storeVideosAction } from './searchVideosMiddleware';
import { Video } from './Video';

function onStoreVideosAction(_, videos: Video[]): VideosStateValue {
  return { items: videos, loading: false };
}

export const videosReducer: Reducer<VideosStateValue> = createReducer(
  { items: [], loading: false },
  actionHandler(storeVideosAction, onStoreVideosAction),
);
