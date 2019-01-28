import { actionCreatorFactory } from '../../../../app/redux/actions';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';

export const addToCollectionResultAction = actionCreatorFactory<
  UpdateCollectionResult
>('ADD_TO_COLLECTION_RESULT');
