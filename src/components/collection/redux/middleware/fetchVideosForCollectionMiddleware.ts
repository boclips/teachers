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
  request.videos.map(videoId =>
    fetchVideoFromSelfLink(videoId.links.self)
      .then(video =>
        storeVideoForCollectionAction({
          video,
          collection: request.collection,
        }),
      )
      .then(store.dispatch),
  );
}

export default sideEffect(
  fetchVideosForCollectionAction,
  onFetchVideosForCollection,
);
