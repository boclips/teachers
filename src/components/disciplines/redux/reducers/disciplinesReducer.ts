import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../app/redux/createReducer';
import { Discipline } from '../../../../types/Discipline';
import { fetchedDisciplinesAction } from '../actions/fetchedDisciplinesAction';

export const disciplinesReducer: Reducer<Discipline[]> = createReducer(
  [],
  actionHandler(
    fetchedDisciplinesAction,
    (_: Discipline[], disciplines: Discipline[]) => {
      return disciplines;
    },
  ),
);
