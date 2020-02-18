import { actionCreatorFactory } from 'src/app/redux/actions';
import { CreateCollectionRequest } from 'src/services/collections/createCollection';

export const createCollectionAction = actionCreatorFactory<
  CreateCollectionRequest
>('CREATE_COLLECTION');
