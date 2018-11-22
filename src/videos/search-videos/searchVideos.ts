import axios from 'axios';

import AppConfig from '../../AppConfig';
import { Links } from '../../links/Links';
import { SearchResults } from '../../State';
import convertVideoResource from '../convertVideoResource';

function parseResponse(response: any, query: string): SearchResults {
  const videos = response.data._embedded.videos.map(convertVideoResource);
  const correlationId =
    response.headers[AppConfig.getCorrelationIdHeaderField()];
  return { videos, searchId: correlationId, query };
}

export default function searchVideos(
  query: string,
  links: Links,
): Promise<SearchResults> {
  return axios
    .get(links.videos.getLink({ query, pageNumber: 0, pageSize: 10 }))
    .then(response => parseResponse(response, query));
}
