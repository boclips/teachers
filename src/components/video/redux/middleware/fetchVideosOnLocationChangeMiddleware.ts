import { LOCATION_CHANGE } from 'connected-react-router';
import { Store } from 'redux';
import {
  actionCreatorFactory,
  sideEffect,
} from '../../../../app/redux/actions';
import State from '../../../../types/State';
import { dispatchSearchVideoAction } from '../../../searchBar/redux/dispatchSearchVideoAction';

export const onLocationChanged = actionCreatorFactory<void>(LOCATION_CHANGE);

export default sideEffect(onLocationChanged, (store: Store<State>) => {
  dispatchSearchVideoAction(store);
});
