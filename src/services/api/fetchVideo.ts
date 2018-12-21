import axios from 'axios';
import { Links } from '../links/Links';
import { Video } from '../types/Video';
import convertVideoResource from '../utils/convertVideoResource';

export default function fetchVideo(id: string, links: Links): Promise<Video> {
  return axios
    .get(links.video.getTemplatedLink({ id }))
    .then(response => response.data)
    .then(convertVideoResource);
}
