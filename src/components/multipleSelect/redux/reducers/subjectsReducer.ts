import { Reducer } from 'redux';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { Subject } from '../../../../types/Subject';
import { fetchedSubjectsAction } from '../actions/fetchedSubjectsAction';

export const subjectsReducer: Reducer<
  Subject[]
> = createReducerWithInitialState(
  [],
  actionHandler(fetchedSubjectsAction, (_: Subject[], subjects: Subject[]) => subjects),
);
