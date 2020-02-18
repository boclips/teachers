import { actionCreatorFactory } from 'src/app/redux/actions';
import { Video } from 'src/types/Video';

export const storeVideoAction = actionCreatorFactory<Video>('STORE_VIDEO');
