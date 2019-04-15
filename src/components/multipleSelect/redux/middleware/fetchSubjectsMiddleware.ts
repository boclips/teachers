import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import { fetchSubjects } from '../../../../services/subjects/fetchSubjects';
import State from '../../../../types/State';
import { Subject } from '../../../../types/Subject';
import { fetchedSubjectsAction } from '../actions/fetchedSubjectsAction';
import { fetchSubjectsAction } from '../actions/fetchSubjectsAction';

export function onFetchSubjects(store: MiddlewareAPI) {
  const state: State = store.getState();

  fetchSubjects(state.links).then((subjects: Subject[]) => {
    store.dispatch(fetchedSubjectsAction(subjects));
  });
}

export default sideEffect(fetchSubjectsAction, onFetchSubjects);
