import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../../app/redux/actions';
import { fetchStates } from '../../../../../services/states/fetchStates';
import { Country } from '../../../../../types/Country';
import { UsaState } from '../../../../../types/UsaState';
import { fetchedStatesAction } from '../actions/fetchedStatesAction';
import { fetchStatesAction } from '../actions/fetchStatesAction';

export function onFetchStates(store: MiddlewareAPI, country: Country) {
  fetchStates(country).then((states: UsaState[]) => {
    store.dispatch(fetchedStatesAction(states));
  });
}

export default sideEffect(fetchStatesAction, onFetchStates);
