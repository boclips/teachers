import { actionCreatorFactory } from 'src/app/redux/actions';
import { UpdateCollectionResult } from '../middleware/addToCollectionResultMiddleware';

export const onRemoveFromCollectionAction = actionCreatorFactory<
  UpdateCollectionResult
>('ON_REMOVE_FROM_COLLECTION');
