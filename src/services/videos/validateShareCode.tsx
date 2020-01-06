import axios from 'axios';
import { Video } from '../../types/Video';

export default function validateShareCode(
  video: Video,
  shareCode: string,
): Promise<boolean> {
  return axios
    .get(video.links.validateShareCode.getTemplatedLink({ shareCode }))
    .then(() => true)
    .catch(() => false);
}
