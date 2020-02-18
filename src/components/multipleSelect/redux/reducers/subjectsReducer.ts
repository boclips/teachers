import { Reducer } from 'redux';
import { Subject } from 'src/types/Subject';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { fetchedSubjectsAction } from '../actions/fetchedSubjectsAction';

export const subjectsReducer: Reducer<Subject[]> = createReducerWithInitialState(
  [],
  actionHandler(
    fetchedSubjectsAction,
    (_: Subject[], subjects: Subject[]) => subjects,
  ),
);
