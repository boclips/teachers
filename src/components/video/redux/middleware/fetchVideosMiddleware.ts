import { LOCATION_CHANGE } from 'connected-react-router';
import { Store } from 'redux';
import { VideoSearchResult } from 'src/types/SearchResults';
import { VideoSearchFacets } from 'src/types/VideoSearchFacets';
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
import { Links } from '../../../../types/Links';

export const onLocationChanged = actionCreatorFactory<void>(LOCATION_CHANGE);

const searchVideosAndCollections = (store: Store<State>) => {
  const links: Links = store.getState().links.entries;
  if (links?.videos) {
    dispatchSearchActions(store);
  }
};

const onFetchVideos = (store: Store<State>, request: VideoSearchRequest) => {
  const links: Links = store.getState().links.entries;
  const facets: VideoSearchFacets = {
    ageRanges: store.getState().ageRanges,
  };

  fetchVideos(request, facets, links).then((result: VideoSearchResult) => {
    store.dispatch(
      storeVideosAction({ videos: result.videos, facets: result.facets }),
    );
  });
};

const onFetchPromotedVideos = (
  store: Store<State>,
  request: VideoSearchRequest,
) => {
  const links: Links = store.getState().links.entries;
  const facets: VideoSearchFacets = {
    ageRanges: store.getState().ageRanges,
  };

  fetchVideos(request, facets, links).then(result => {
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
