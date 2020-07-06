import { LOCATION_CHANGE } from 'connected-react-router';
import { Store } from 'redux';
import { VideoSearchResult } from 'src/types/SearchResults';
import { VideoSearchFacets } from 'src/types/VideoSearchFacets';
import { PROMOTED_VIDEOS_SIZE } from 'src/views/home/HomeViewVideoList';
import {
  actionCreatorFactory,
  sideEffect,
} from '../../../../app/redux/actions';
import { storeLinksAction } from '../../../../app/redux/links/actions/storeLinksAction';
import fetchVideos from '../../../../services/videos/fetchVideos';
import State from '../../../../types/State';
import { VideoSearchRequest } from '../../../../types/VideoSearchRequest';
import { dispatchSearchActions } from '../../../searchBar/redux/dispatchSearchActions';
import {
  fetchPromotedVideosAction,
  PromotedVideosRequest,
} from '../actions/fetchPromotedVideosAction';
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
    durations: store.getState().durations,
    resourceTypes: store.getState().resourceTypes,
  };

  fetchVideos(request, facets, links).then((result: VideoSearchResult) => {
    store.dispatch(
      storeVideosAction({ videos: result.videos, facets: result.facets }),
    );
  });
};

const onFetchPromotedVideos = (
  store: Store<State>,
  request: PromotedVideosRequest,
) => {
  const links: Links = store.getState().links.entries;

  fetchVideos(request.videoSearchRequest, null, links).then((result) => {
    store.dispatch(
      storePromotedVideosAction({
        promotedVideos: result.videos,
        additionalVideos: request.additionalVideos,
      }),
    );

    if (
      !request.additionalVideos &&
      result.videos?.length < PROMOTED_VIDEOS_SIZE
    ) {
      store.dispatch(
        fetchPromotedVideosAction({
          videoSearchRequest: {
            ...request.videoSearchRequest,
            filters: {
              ...request.videoSearchRequest.filters,
              subject: undefined,
            },
          },
          additionalVideos: true,
        }),
      );
    }
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
