import axios from 'axios';
import { VideoSearchFacets } from 'src/types/VideoSearchFacets';
import { generateVideoSearchUri } from 'src/services/videos/generateVideoSearchUri';
import { Links } from '../../types/Links';
import { VideoSearchResult } from '../../types/SearchResults';
import { VideoSearchRequest } from '../../types/VideoSearchRequest';
import { parseVideosResponse } from './parseVideosResponse';

export default function fetchVideos(
  searchRequest: VideoSearchRequest,
  facets: VideoSearchFacets,
  links: Links,
): Promise<VideoSearchResult> {
  return axios
    .get(generateVideoSearchUri(searchRequest, facets, links))
    .then(response => parseVideosResponse(response, searchRequest.query));
}
