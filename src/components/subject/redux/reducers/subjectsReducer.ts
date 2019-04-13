import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { Subject } from '../../../../types/Subject';
import { fetchedSubjectsAction } from '../actions/fetchedSubjectsAction';

export const subjectsReducer: Reducer<Subject[]> = createReducer(
  [],
  actionHandler(fetchedSubjectsAction, (_: Subject[], subjects: Subject[]) => {
    return subjects;
  }),
);
