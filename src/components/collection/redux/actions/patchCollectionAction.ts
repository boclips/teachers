import { actionCreatorFactory } from '../../../../app/redux/actions';
import { VideoCollection } from '../../../../types/VideoCollection';

export const patchCollectionAction = actionCreatorFactory<VideoCollection>(
  'patchCollectionAction',
);
