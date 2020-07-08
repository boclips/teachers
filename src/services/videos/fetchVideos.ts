import { VideoSearchFacets } from 'src/types/VideoSearchFacets';
import { VideoSearchRequest as ApiVideoSearchRequest } from 'boclips-api-client/dist/sub-clients/videos/model/VideoSearchRequest';
import { ApiClientWrapper } from 'src/services/apiClient';
import { createApiVideoSearchRequest } from 'src/services/videos/createApiVideoSearchRequest';
import { VideoSearchResult } from 'src/types/SearchResults';
import { convertApiClientVideo } from 'src/services/videos/convertApiClientVideo';
import { VideoSearchResults } from 'boclips-api-client/dist/sub-clients/videos/model/VideoSearchResults';
import { BoclipsClient } from 'boclips-api-client';
import { VideoSearchRequest } from '../../types/VideoSearchRequest';

export default function fetchVideos(
  searchRequest: VideoSearchRequest,
  facets: VideoSearchFacets,
): Promise<VideoSearchResult> {
  const apiSearchRequest: ApiVideoSearchRequest = createApiVideoSearchRequest(
    searchRequest,
    facets,
  );
  return ApiClientWrapper.get()
    .then((client: BoclipsClient) => client.videos.search(apiSearchRequest))
    .then((results: VideoSearchResults) => ({
      query: searchRequest.query,
      videos: results.page.map(convertApiClientVideo),
      paging: results.pageSpec,
      facets: results.facets,
    }));
}
