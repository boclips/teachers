import { FetchedVideo } from 'src/types/Video';
import { actionCreatorFactory } from '../../../../app/redux/actions';

export const storeVideoAction = actionCreatorFactory<FetchedVideo>(
  'STORE_VIDEO',
);
