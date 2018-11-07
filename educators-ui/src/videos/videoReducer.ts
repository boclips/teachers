import { Reducer } from 'redux';
import createReducer, { actionHandler } from '../redux/createReducer';
import { VideoStateValue } from '../State';
import { Video } from './Video';
import { storeVideoAction } from './video-details/videoDetailsMiddleware';
import { fetchVideoAction } from './video-details/VideoDetailsView';

const initialState: VideoStateValue = { loading: false, item: null };

function onFetchVideoAction(): VideoStateValue {
  return { loading: true, item: null };
}

function onStoreVideoAction(_: VideoStateValue, video: Video): VideoStateValue {
  return { loading: false, item: video };
}

export const videoReducer: Reducer<VideoStateValue> = createReducer(
  initialState,
  actionHandler(fetchVideoAction, onFetchVideoAction),
  actionHandler(storeVideoAction, onStoreVideoAction),
);
