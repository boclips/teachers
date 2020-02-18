import { Dispatch, MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { fetchVideoFromSelfLink } from 'src/services/videos/fetchVideo';
import { LinksState } from 'src/types/State';
import { storeVideosAction } from '../../../video/redux/actions/storeVideosAction';
import {
  fetchVideosByIdsAction,
  VideosForCollectionRequest,
} from '../../../video/redux/actions/fetchVideosByIdsAction';

export function onFetchVideosForCollection(
  store: MiddlewareAPI<Dispatch, LinksState>,
  request: VideosForCollectionRequest,
) {
  Promise.all(
    request.videos.map(videoId => fetchVideoFromSelfLink(videoId.links.self)),
  )
    .then(videos =>
      store.dispatch(
        storeVideosAction({
          videos,
        }),
      ),
    )
    .catch(console.error);
}

export default sideEffect(fetchVideosByIdsAction, onFetchVideosForCollection);
