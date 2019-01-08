import axios from 'axios';
import { Links } from '../../types/Links';
import { SearchRequest } from '../../types/SearchRequest';
import { SearchResults } from '../../types/State';
import { parseVideosResponse } from './parseVideosResponse';

export default function fetchVideos(
  searchRequest: SearchRequest,
  links: Links,
): Promise<SearchResults> {
  const url = links.videos.getTemplatedLink({
    query: searchRequest.query,
    size: 10,
    page: searchRequest.page - 1,
    category: 'classroom',
  });
  return axios
    .get(url)
    .then(response => parseVideosResponse(response, searchRequest.query));
}
