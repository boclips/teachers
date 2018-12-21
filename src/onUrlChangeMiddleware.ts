import { LOCATION_CHANGE } from 'connected-react-router';
import { Store } from 'redux';
import { dispatchSearchVideoAction } from './components/searchBar/redux/dispatchSearchVideoAction';
import { actionCreatorFactory, sideEffect } from './redux/actions';
import State from './redux/State';

export const onLocationChanged = actionCreatorFactory<void>(LOCATION_CHANGE);

export default sideEffect(onLocationChanged, (store: Store<State>) => {
  dispatchSearchVideoAction(store);
});
