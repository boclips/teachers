import { VideoFacets } from 'src/types/VideoFacets';
import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export const storeVideosAction = actionCreatorFactory<{
  videos: Video[];
  facets?: VideoFacets;
}>('STORE_VIDEOS');
