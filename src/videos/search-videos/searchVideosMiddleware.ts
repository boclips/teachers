import { MiddlewareAPI } from 'redux';
import { actionCreatorFactory, sideEffect } from '../../redux/actions';
import { LinksState, UserState } from '../../State';
import { Video } from '../Video';
import searchVideos from './searchVideos';
import { searchVideosAction } from './SearchView';

export const storeVideosAction = actionCreatorFactory<Video[]>('STORE_VIDEOS');

export function onSearchVideos(
  store: MiddlewareAPI<any, LinksState & UserState>,
  query: string,
) {
  searchVideos(query, store.getState().links).then(videos => {
    store.dispatch(storeVideosAction(videos));
  });
}

export default sideEffect(searchVideosAction, onSearchVideos);
