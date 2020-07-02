import { actionCreatorFactory } from './../../../../app/redux/actions';

export const fetchCollectionAction = actionCreatorFactory<{
  id: string;
  referer?: string;
  shareCode?: string;
}>('FETCH_COLLECTION');
