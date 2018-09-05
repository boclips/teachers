import { Reducer } from 'redux';
import createReducer, { actionHandler } from '../redux/createReducer';
import { VideosStateValue } from '../State';
import { storeVideosAction } from './searchVideosMiddleware';
import { searchVideosAction } from './SearchView';
import { Video } from './Video';

function onSearchVideosAction(_, query: string): VideosStateValue {
  return { items: [], loading: true, query };
}

function onStoreVideosAction(
  state: VideosStateValue,
  videos: Video[],
): VideosStateValue {
  return { items: videos, loading: false, query: state.query };
}

export const videosReducer: Reducer<VideosStateValue> = createReducer(
  { items: [], loading: false },
  actionHandler(searchVideosAction, onSearchVideosAction),
  actionHandler(storeVideosAction, onStoreVideosAction),
);
