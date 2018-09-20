import axios from 'axios';

import { Links } from '../../links/Links';
import { SearchResults } from '../../State';
import convertVideoResource from '../convertVideoResource';

function parseResponse(body: any, query: string): SearchResults {
  const videos = body.videos.map(convertVideoResource);
  return { videos, searchId: body.searchId, query };
}

export default function searchVideos(
  query: string,
  links: Links,
): Promise<SearchResults> {
  return axios
    .get(links.videos.getLink({ query }))
    .then(response => response.data)
    .then(body => parseResponse(body, query));
}
