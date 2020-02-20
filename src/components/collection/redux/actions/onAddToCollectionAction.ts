import { actionCreatorFactory } from '../../../../app/redux/actions';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';

export const onAddToCollectionAction = actionCreatorFactory<
  UpdateCollectionResult
>('ON_ADD_TO_COLLECTION');
