import axios from 'axios';
import { Link } from 'src/types/Link';
import { Links } from 'src/types/Links';
import { Video } from 'src/types/Video';
import convertVideoResource from './convertVideoResource';

export default function fetchVideo(id: string, links: Links): Promise<Video> {
  return axios
    .get(links.video.getTemplatedLink({ id }))
    .then(response => response.data)
    .then(convertVideoResource);
}

export function fetchVideoFromSelfLink(link: Link): Promise<Video> {
  return axios
    .get(link.getOriginalLink())
    .then(response => response.data)
    .then(convertVideoResource);
}
