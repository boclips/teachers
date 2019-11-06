import { Dispatch, MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchVideoFromSelfLink } from '../../../../services/videos/fetchVideo';
import { LinksState } from '../../../../types/State';
import {
  fetchVideosByIdsAction,
  VideosForCollectionRequest,
} from '../../../video/redux/actions/fetchVideosByIdsAction';
import { storeVideosAction } from '../../../video/redux/actions/storeVideosAction';

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
