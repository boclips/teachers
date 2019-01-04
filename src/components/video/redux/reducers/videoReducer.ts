import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { VideoStateValue } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { fetchVideoAction } from '../../../../views/videoDetails/VideoDetailsView';
import { storeVideoAction } from '../actions/storeVideoAction';

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
