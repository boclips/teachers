import { Dispatch, MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchVideoFromSelfLink } from '../../../../services/videos/fetchVideo';
import { LinksState } from '../../../../types/State';
import { VideosForCollectionRequest } from '../actions/fetchVideosForCollectionAction';
import { storeVideoForCollectionAction } from '../actions/storeVideoForCollectionAction';
import { fetchVideosForCollectionAction } from './../actions/fetchVideosForCollectionAction';

export function onFetchVideosForCollection(
  store: MiddlewareAPI<Dispatch, LinksState>,
  request: VideosForCollectionRequest,
) {
  Promise.all(
    request.videos.map(videoId => fetchVideoFromSelfLink(videoId.links.self)),
  ).then(videos =>
    store.dispatch(
      storeVideoForCollectionAction({
        videos,
        collection: request.collection,
      }),
    ),
  );
}

export default sideEffect(
  fetchVideosForCollectionAction,
  onFetchVideosForCollection,
);
