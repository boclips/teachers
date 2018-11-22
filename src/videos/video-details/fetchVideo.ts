import axios from 'axios';
import { Links } from '../../links/Links';
import convertVideoResource from '../convertVideoResource';
import { Video } from '../Video';

export default function fetchVideo(id: string, links: Links): Promise<Video> {
  return axios
    .get(links.video.getTemplatedLink({ id }))
    .then(response => response.data)
    .then(convertVideoResource);
}
