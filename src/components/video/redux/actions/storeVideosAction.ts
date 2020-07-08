import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { actionCreatorFactory } from '../../../../app/redux/actions';
import { Video } from '../../../../types/Video';

export const storeVideosAction = actionCreatorFactory<{
  videos: Video[];
  facets?: VideoFacets;
}>('STORE_VIDEOS');
