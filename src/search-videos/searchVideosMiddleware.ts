import {MiddlewareAPI} from 'redux';
import {actionCreatorFactory, sideEffect} from '../redux/actions';
import {LinksState} from '../State';
import searchVideos from './searchVideos';
import {searchVideosAction} from './SearchView';
import {Video} from './Video';

export const storeVideosAction = actionCreatorFactory<Video[]>('STORE_VIDEOS');

export function onSearchVideos(store: MiddlewareAPI<any, LinksState>, query: string) {
  searchVideos(query, store.getState().links).then((videos) => {
    store.dispatch(storeVideosAction(videos));
  });
}

export default sideEffect(searchVideosAction, onSearchVideos);
