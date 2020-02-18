import { actionCreatorFactory } from 'src/app/redux/actions';
import { Discipline } from 'src/types/Discipline';

export const fetchedDisciplinesAction = actionCreatorFactory<Discipline[]>(
  'DISCIPLINES_FETCHED',
);
