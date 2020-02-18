import { LOCATION_CHANGE } from 'connected-react-router';
import { Store } from 'redux';
import { actionCreatorFactory, sideEffect } from 'src/app/redux/actions';
import { storeLinksAction } from 'src/app/redux/links/actions/storeLinksAction';
import fetchVideos from 'src/services/videos/fetchVideos';
import State from 'src/types/State';
import { VideoSearchRequest } from 'src/types/VideoSearchRequest';
import { Links } from 'src/types/Links';
import { storeVideosAction } from '../actions/storeVideosAction';
import { storePromotedVideosAction } from '../actions/storePromotedVideosAction';
import { fetchVideosAction } from '../actions/fetchVideosAction';
import { fetchPromotedVideosAction } from '../actions/fetchPromotedVideosAction';
import { dispatchSearchActions } from '../../../searchBar/redux/dispatchSearchActions';

export const onLocationChanged = actionCreatorFactory<void>(LOCATION_CHANGE);

const searchVideosAndCollections = (store: Store<State>) => {
  const links: Links = store.getState().links.entries;
  if (links && links.videos) {
    dispatchSearchActions(store);
  }
};

const onFetchVideos = (store: Store<State>, request: VideoSearchRequest) => {
  const links: Links = store.getState().links.entries;
  fetchVideos(request, links).then(result => {
    store.dispatch(storeVideosAction({ videos: result.videos }));
  });
};

const onFetchPromotedVideos = (
  store: Store<State>,
  request: VideoSearchRequest,
) => {
  const links: Links = store.getState().links.entries;
  fetchVideos(request, links).then(result => {
    store.dispatch(
      storePromotedVideosAction({ promotedVideos: result.videos }),
    );
  });
};

const onUrlChangeMiddleware = sideEffect(
  onLocationChanged,
  searchVideosAndCollections,
);
const onLinksFetched = sideEffect(storeLinksAction, searchVideosAndCollections);

export default [
  onUrlChangeMiddleware,
  onLinksFetched,
  sideEffect(fetchVideosAction, onFetchVideos),
  sideEffect(fetchPromotedVideosAction, onFetchPromotedVideos),
];
