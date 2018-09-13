import { Reducer } from 'redux';
import createReducer, { actionHandler } from '../redux/createReducer';
import { VideosStateValue } from '../State';
import { storeVideosAction } from './search-videos/searchVideosMiddleware';
import { searchVideosAction } from './search-videos/SearchView';
import { Video } from './Video';

const initialState: VideosStateValue = { items: [], loading: false, query: '' };

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
  initialState,
  actionHandler(searchVideosAction, onSearchVideosAction),
  actionHandler(storeVideosAction, onStoreVideosAction),
);
