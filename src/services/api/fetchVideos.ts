import axios from 'axios';
import { SearchResults } from '../../redux/State';
import { Links } from '../links/Links';
import { SearchRequest } from '../types/SearchRequest';
import { parseVideosResponse } from '../utils/parseVideosResponse';

export default function fetchVideos(
  searchRequest: SearchRequest,
  links: Links,
): Promise<SearchResults> {
  const url = links.videos.getTemplatedLink({
    query: searchRequest.query,
    size: 10,
    page: searchRequest.page - 1,
  });
  return axios
    .get(url)
    .then(response => parseVideosResponse(response, searchRequest.query));
}
