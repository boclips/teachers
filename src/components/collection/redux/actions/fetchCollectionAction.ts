import { actionCreatorFactory } from './../../../../app/redux/actions';

export const fetchCollectionAction = actionCreatorFactory<string>(
  'FETCH_COLLECTION',
);
