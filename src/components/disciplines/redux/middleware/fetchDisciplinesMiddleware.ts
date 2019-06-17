import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchDisciplines } from '../../../../services/disciplines/fetchDisciplines';
import { Discipline } from '../../../../types/Discipline';
import State from '../../../../types/State';
import { fetchDisciplinesAction } from '../actions/fetchDisciplinesAction';
import { fetchedDisciplinesAction } from '../actions/fetchedDisciplinesAction';

export function onFetchDisciplines(store: MiddlewareAPI) {
  const state: State = store.getState();

  fetchDisciplines(state.links).then((subjects: Discipline[]) => {
    store.dispatch(fetchedDisciplinesAction(subjects));
  });
}

export default sideEffect(fetchDisciplinesAction, onFetchDisciplines);
