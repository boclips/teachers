import { Reducer } from 'redux';
import createReducerWithInitialState, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { Discipline } from '../../../../types/Discipline';
import { fetchedDisciplinesAction } from '../actions/fetchedDisciplinesAction';

export const disciplinesReducer: Reducer<
  Discipline[]
> = createReducerWithInitialState(
  [],
  actionHandler(
    fetchedDisciplinesAction,
    (_: Discipline[], disciplines: Discipline[]) => disciplines,
  ),
);
