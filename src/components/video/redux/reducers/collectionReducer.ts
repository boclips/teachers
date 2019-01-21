import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { Link } from '../../../../types/Link';
import { Video } from '../../../../types/Video';
import {
  addToDefaultCollectionAction,
  removeFromDefaultCollectionAction,
} from '../../../searchResults/VideoCard';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { VideoCollection } from './../../../../types/VideoCollection';

const initialState: VideoCollection = {
  videos: [],
  links: {
    addVideo: new Link({ href: '' }),
    removeVideo: new Link({ href: '' }),
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

const onRemoveVideoAction = (
  state: VideoCollection,
  video: Video,
): VideoCollection => {
  const videos = state.videos.filter(v => v.id !== video.id);
  return { ...state, videos };
};

export const collectionReducer: Reducer<VideoCollection> = createReducer(
  initialState,
  actionHandler(storeCollectionAction, onStoreCollectionAction),
  actionHandler(addToDefaultCollectionAction, onAddVideoAction),
  actionHandler(removeFromDefaultCollectionAction, onRemoveVideoAction),
);
