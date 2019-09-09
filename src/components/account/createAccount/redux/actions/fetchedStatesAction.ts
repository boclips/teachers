import { actionCreatorFactory } from '../../../../../app/redux/actions';
import { UsaState } from '../../../../../types/UsaState';

export const fetchedStatesAction = actionCreatorFactory<UsaState[]>(
  'STATES_FETCHED',
);
