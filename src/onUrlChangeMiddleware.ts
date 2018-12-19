import { LOCATION_CHANGE } from 'connected-react-router';
import { Store } from 'redux';
import { actionCreatorFactory, sideEffect } from './redux/actions';
import State from './State';
import { dispatchSearchVideoAction } from './videos/search-videos/dispatchSearchVideoAction';

export const onLocationChanged = actionCreatorFactory<void>(LOCATION_CHANGE);

export default sideEffect(onLocationChanged, (store: Store<State>) => {
  dispatchSearchVideoAction(store);
});
