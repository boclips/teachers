import axios from 'axios';

import { Links } from '../../links/Links';
import convertVideoResource from '../convertVideoResource';
import { Video } from '../Video';

export default function searchVideos(
  query: string,
  links: Links,
): Promise<Video[]> {
  return axios
    .get(links.videos.getLink({ query }))
    .then(response => response.data)
    .then(body => body._embedded.videos.map(convertVideoResource));
}
