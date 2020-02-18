import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { fetchDisciplines } from 'src/services/disciplines/fetchDisciplines';
import { Discipline } from 'src/types/Discipline';
import { Links } from 'src/types/Links';
import { fetchedDisciplinesAction } from '../actions/fetchedDisciplinesAction';
import { fetchDisciplinesAction } from '../actions/fetchDisciplinesAction';

export function onFetchDisciplines(store: MiddlewareAPI) {
  const links: Links = store.getState().links.entries;

  fetchDisciplines(links).then((subjects: Discipline[]) => {
    store.dispatch(fetchedDisciplinesAction(subjects));
  });
}

export default sideEffect(fetchDisciplinesAction, onFetchDisciplines);
