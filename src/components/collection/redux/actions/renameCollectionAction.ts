import { actionCreatorFactory } from '../../../../app/redux/actions';
import { RenameCollectionRequest } from '../../../../services/collections/renameCollection';

export const renameCollectionAction = actionCreatorFactory<
  RenameCollectionRequest
>('RENAME_COLLECTION');
