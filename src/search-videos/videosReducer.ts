import { Reducer } from 'redux';
import { Action } from '../redux/actions';
import createReducer from '../redux/createReducer';
import { VideosStateValue } from '../State';
import { storeVideosAction } from './searchVideosMiddleware';
import { Video } from './Video';

const initialState: VideosStateValue = { items: [], loading: false };

function onStoreVideosAction(_, action: Action<Video[]>): VideosStateValue {
  return { items: action.payload, loading: false };
}

export const videosReducer: Reducer<VideosStateValue> = createReducer(
  initialState,
  [storeVideosAction, onStoreVideosAction],
);
