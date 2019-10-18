import { Dispatch, MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchVideoFromSelfLink } from '../../../../services/videos/fetchVideo';
import { LinksState } from '../../../../types/State';
import { VideosForCollectionRequest } from '../actions/fetchVideosForCollectionAction';
import { storeVideosForCollectionAction } from '../actions/storeVideosForCollectionAction';
import { fetchVideosForCollectionAction } from './../actions/fetchVideosForCollectionAction';

export function onFetchVideosForCollection(
  store: MiddlewareAPI<Dispatch, LinksState>,
  request: VideosForCollectionRequest,
) {
  Promise.all(
    request.videos.map(videoId => fetchVideoFromSelfLink(videoId.links.self)),
  )
    .then(videos =>
      store.dispatch(
        storeVideosForCollectionAction({
          videos,
          collection: request.collection,
        }),
      ),
    )
    .catch(console.error);
}

export default sideEffect(
  fetchVideosForCollectionAction,
  onFetchVideosForCollection,
);
