import { actionCreatorFactory } from '../../../../app/redux/actions';
import { CreateCollectionRequest } from '../../../../services/collections/createCollection';

export const createCollectionAction = actionCreatorFactory<CreateCollectionRequest>(
  'CREATE_COLLECTION',
);
