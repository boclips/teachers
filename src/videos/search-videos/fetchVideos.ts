import axios from 'axios';
import { Links } from '../../links/Links';
import { SearchResults } from '../../State';
import { parseVideosResponse } from './parseVideosResponse';
import { SearchRequest } from './SearchRequest';

export default function fetchVideos(
  searchRequest: SearchRequest,
  links: Links,
): Promise<SearchResults> {
  const url = links.videos.getTemplatedLink({
    query: searchRequest.query,
    pageSize: 10,
    pageNumber: searchRequest.pageNumber - 1,
  });
  return axios
    .get(url)
    .then(response => parseVideosResponse(response, searchRequest.query));
}
