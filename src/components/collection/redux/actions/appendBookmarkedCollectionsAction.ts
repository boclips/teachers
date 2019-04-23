import { actionCreatorFactory } from '../../../../app/redux/actions';
import { AppendCollectionRequest } from './appendPublicCollectionsAction';

export const appendBookmarkedCollectionsAction = actionCreatorFactory<
  AppendCollectionRequest
>('APPEND_BOOKMARKED_COLLECTIONS');
