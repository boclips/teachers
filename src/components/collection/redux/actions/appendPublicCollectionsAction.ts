import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Scrollable } from '../../../../types/State';
import { VideoCollection } from '../../../../types/VideoCollection';

export const appendPublicCollectionsAction = actionCreatorFactory<
  Scrollable<VideoCollection>
>('APPEND_PUBLIC_COLLECTIONS');
