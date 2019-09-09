import { Reducer } from 'redux';
import createReducer, {
  actionHandler,
} from '../../../../../app/redux/createReducer';
import { UsaState } from '../../../../../types/UsaState';
import { fetchedStatesAction } from '../actions/fetchedStatesAction';
export const statesReducer: Reducer<UsaState[]> = createReducer(
  [],
  actionHandler(fetchedStatesAction, (_: UsaState[], states: UsaState[]) => {
    return states;
  }),
);
