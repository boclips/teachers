import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export const storeVideoAction = actionCreatorFactory<Video>('STORE_VIDEO');
