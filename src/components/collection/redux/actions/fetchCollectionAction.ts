import { actionCreatorFactory } from 'src/app/redux/actions';

export const fetchCollectionAction = actionCreatorFactory<string>(
  'FETCH_COLLECTION',
);
