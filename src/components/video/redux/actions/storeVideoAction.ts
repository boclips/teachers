import { actionCreatorFactory } from '../../../../redux/actions';
import { Video } from '../../../../services/types/Video';

export const storeVideoAction = actionCreatorFactory<Video>('STORE_VIDEO');
