import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Discipline } from '../../../../types/Discipline';

export const fetchedDisciplinesAction = actionCreatorFactory<Discipline[]>(
  'DISCIPLINES_FETCHED',
);
