import { actionCreatorFactory } from '../../../../app/redux/actions';

export const storeCollectionBeingViewedAction = actionCreatorFactory<{
  id: string;
}>('STORE_COLLECTION_BEING_VIEWED_ACTION');
