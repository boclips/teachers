import { LOCATION_CHANGE } from 'connected-react-router';
import { Store } from 'redux';
import {
  actionCreatorFactory,
  sideEffect,
} from '../../../../app/redux/actions';
import { storeLinksAction } from '../../../../app/redux/links/actions/storeLinksAction';
import fetchVideos from '../../../../services/videos/fetchVideos';
import State from '../../../../types/State';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { dispatchSearchActions } from '../../../searchBar/redux/dispatchSearchActions';
import { fetchPromotedVideosAction } from '../actions/fetchPromotedVideosAction';
import { fetchVideosAction } from '../actions/fetchVideosAction';
import { storePromotedVideosAction } from '../actions/storePromotedVideosAction';
import { storeVideosAction } from '../actions/storeVideosAction';

export const onLocationChanged = actionCreatorFactory<void>(LOCATION_CHANGE);

const searchVideos = (store: Store<State>) => {
  if (store.getState().links && store.getState().links.videos) {
    dispatchSearchActions(store);
  }
};

const onFetchVideos = (store: Store<State>, request: VideoSearchRequest) => {
  const links = store.getState().links;
  fetchVideos(request, links).then(result => {
    store.dispatch(storeVideosAction({ videos: result.videos }));
  });
};

const onFetchPromotedVideos = (
  store: Store<State>,
  request: VideoSearchRequest,
) => {
  const links = store.getState().links;
  fetchVideos(request, links).then(result => {
    store.dispatch(
      storePromotedVideosAction({ promotedVideos: result.videos }),
    );
  });
};

const onUrlChangeMiddleware = sideEffect(onLocationChanged, searchVideos);
const onLinksFetched = sideEffect(storeLinksAction, searchVideos);

export default [
  onUrlChangeMiddleware,
  onLinksFetched,
  sideEffect(fetchVideosAction, onFetchVideos),
  sideEffect(fetchPromotedVideosAction, onFetchPromotedVideos),
];
