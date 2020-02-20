import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchDisciplines } from '../../../../services/disciplines/fetchDisciplines';
import { Discipline } from '../../../../types/Discipline';
import { fetchDisciplinesAction } from '../actions/fetchDisciplinesAction';
import { fetchedDisciplinesAction } from '../actions/fetchedDisciplinesAction';
import { Links } from '../../../../types/Links';

export function onFetchDisciplines(store: MiddlewareAPI) {
  const links: Links = store.getState().links.entries;

  fetchDisciplines(links).then((subjects: Discipline[]) => {
    store.dispatch(fetchedDisciplinesAction(subjects));
  });
}

export default sideEffect(fetchDisciplinesAction, onFetchDisciplines);
