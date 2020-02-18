import { actionCreatorFactory } from 'src/app/redux/actions';
import { Subject } from 'src/types/Subject';

export const fetchedSubjectsAction = actionCreatorFactory<Subject[]>(
  'SUBJECTS_FETCHED',
);
