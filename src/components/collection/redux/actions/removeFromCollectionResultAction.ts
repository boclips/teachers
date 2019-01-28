import { actionCreatorFactory } from '../../../../app/redux/actions';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';

export const removeFromCollectionResultAction = actionCreatorFactory<
  UpdateCollectionResult
>('REMOVE_FROM_COLLECTION_RESULT');
