import { actionCreatorFactory } from '../../../../app/redux/actions';
import { AddToCollectionResult } from '../middleware/addToCollectionResultMiddleware';

export const addToCollectionResultAction = actionCreatorFactory<
  AddToCollectionResult
>('ADD_TO_COLLECTION_RESULT');
