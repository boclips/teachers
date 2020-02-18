import { Reducer } from 'redux';
import { Discipline } from 'src/types/Discipline';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { fetchedDisciplinesAction } from '../actions/fetchedDisciplinesAction';

export const disciplinesReducer: Reducer<Discipline[]> = createReducerWithInitialState(
  [],
  actionHandler(
    fetchedDisciplinesAction,
    (_: Discipline[], disciplines: Discipline[]) => disciplines,
  ),
);
