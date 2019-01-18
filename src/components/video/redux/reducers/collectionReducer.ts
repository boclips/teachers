import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { Link } from '../../../../types/Link';
import { Video } from '../../../../types/Video';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { VideoCollection } from './../../../../types/VideoCollection';
import { addToDefaultCollectionAction } from './../../../../views/searchResults/SearchResultsView';

const initialState: VideoCollection = {
  videos: [],
  links: {
    addVideo: new Link({ href: '' }),
  },
};

const onStoreCollectionAction = (
  _: VideoCollection,
  videoCollection: VideoCollection,
): VideoCollection => {
  return videoCollection;
};

const onAddVideoAction = (
  state: VideoCollection,
  video: Video,
): VideoCollection => {
  const { videos } = state;

  if (videos.find(v => v.id === video.id)) {
    return state;
  }

  return { ...state, videos: [...state.videos, video] };
};

export const collectionReducer: Reducer<VideoCollection> = createReducer(
  initialState,
  actionHandler(storeCollectionAction, onStoreCollectionAction),
  actionHandler(addToDefaultCollectionAction, onAddVideoAction),
);
