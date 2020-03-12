import axios from 'axios';
import { Tag } from '../../types/Tag';
import { Video } from '../../types/Video';
import convertVideoResource from '../videos/convertVideoResource';

export default function tagVideo(video: Video, tag: Tag): Promise<Video> {
  return axios
    .patch(
      video.links.tag.getOriginalLink(),
      tag.links.self.getOriginalLink(),
      {
        headers: { 'content-type': 'text/uri-list' },
      },
    )
    .then(response => response.data)
    .then(convertVideoResource);
}
