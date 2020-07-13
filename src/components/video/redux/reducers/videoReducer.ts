import produce from 'immer';
import union from 'lodash/union';
import {
  actionHandler,
  ActionHandler,
} from '../../../../app/redux/createReducer';
import State, { VideoStateValue } from '../../../../types/State';
import { Video } from '../../../../types/Video';
import { organizeById } from '../../../../utils/entityMap';
import { fetchVideoAction } from '../actions/fetchVideoAction';
import {
  PromotedVideos,
  storePromotedVideosAction,
} from '../actions/storePromotedVideosAction';
import { storeVideoAction } from '../actions/storeVideoAction';
import { storeVideosAction } from '../actions/storeVideosAction';

const onFetchVideoAction = (state: State): State => ({
  ...state,
  video: { loading: true, id: null },
});

const onStoreVideoAction = (state: State, video: Video): State =>
  produce(state, (draftState) => {
    if (video) {
      draftState.entities.videos.byId[video.id] = video;
      draftState.video = {
        loading: false,
        id: { value: video.id, links: video.links },
      };
    } else {
      draftState.video = {
        loading: false,
        id: null,
      };
    }
  });

const onStoreVideosAction = (
  state: State,
  request: { videos: Video[] },
): State =>
  produce(state, (draftState) => {
    const newVideos = organizeById(request.videos);

    draftState.entities.videos.byId = {
      ...draftState.entities.videos.byId,
      ...newVideos,
    };
  });

const onStorePromotedVideosAction = (
  state: State,
  request: PromotedVideos,
): State => {
  const stateTemp = onStoreVideosAction(state, {
    videos: request.promotedVideos,
  });
  return produce(stateTemp, (draftState) => {
    const ids: string[] = request.promotedVideos.map((video) => video.id);
    draftState.videos.promotedVideoIds = request.additionalVideos
      ? union(draftState.videos.promotedVideoIds, ids)
      : ids;
  });
};

export const initialVideoState: VideoStateValue = { loading: false, id: null };

export const videoHandlers: Array<ActionHandler<State, any>> = [
  actionHandler(fetchVideoAction, onFetchVideoAction),
  actionHandler(storeVideoAction, onStoreVideoAction),
  actionHandler(storeVideosAction, onStoreVideosAction),
  actionHandler(storePromotedVideosAction, onStorePromotedVideosAction),
];

export const getVideosByIds = (state: State, videoIds: string[]): Video[] =>
  videoIds.map((id) => getVideoById(state, id));

export const getVideoById = (state: State, videoId: string): Video =>
  state.entities.videos.byId[videoId];

export const isLoading = (state: State): Boolean => state.video?.loading;

export const getPromotedVideos = (state: State): Video[] =>
  getVideosByIds(state, state.videos.promotedVideoIds);

export const getPromotedVideoIds = (state: State): string[] =>
  state.videos.promotedVideoIds;
