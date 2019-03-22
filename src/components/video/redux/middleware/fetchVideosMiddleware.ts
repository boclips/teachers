import { LOCATION_CHANGE } from 'connected-react-router';
import { Store } from 'redux';
import {
  actionCreatorFactory,
  sideEffect,
} from '../../../../app/redux/actions';
import { storeLinksAction } from '../../../../app/redux/links/actions/storeLinksAction';
import State from '../../../../types/State';
import { dispatchSearchVideoAction } from '../../../searchBar/redux/dispatchSearchVideoAction';

export const onLocationChanged = actionCreatorFactory<void>(LOCATION_CHANGE);

const fetchVideos = (store: Store<State>) => {
  if (store.getState().links && store.getState().links.videos) {
    dispatchSearchVideoAction(store);
  }
};

const onUrlChangeMiddleware = sideEffect(onLocationChanged, fetchVideos);
const onLinksFetched = sideEffect(storeLinksAction, fetchVideos);

export default [onUrlChangeMiddleware, onLinksFetched];