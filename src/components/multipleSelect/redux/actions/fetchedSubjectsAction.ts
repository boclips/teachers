import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Subject } from '../../../../types/Subject';

export const fetchedSubjectsAction = actionCreatorFactory<Subject[]>(
  'SUBJECTS_FETCHED',
);
