import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { fetchSubjects } from 'src/services/subjects/fetchSubjects';
import { Subject } from 'src/types/Subject';
import { fetchSubjectsAction } from '../actions/fetchSubjectsAction';
import { fetchedSubjectsAction } from '../actions/fetchedSubjectsAction';

export function onFetchSubjects(store: MiddlewareAPI) {
  fetchSubjects().then((subjects: Subject[]) => {
    store.dispatch(fetchedSubjectsAction(subjects));
  });
}

export default sideEffect(fetchSubjectsAction, onFetchSubjects);
