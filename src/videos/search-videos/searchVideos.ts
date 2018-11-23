import axios from 'axios';
import { Links } from '../../links/Links';
import { SearchResults } from '../../State';
import { parseVideosResponse } from './parseVideosResponse';

export default function searchVideos(
  query: string,
  links: Links,
): Promise<SearchResults> {
  const url = links.videos.getTemplatedLink({
    query,
    pageSize: 10,
    pageNumber: 1,
  });
  return axios.get(url).then(response => parseVideosResponse(response, query));
}
