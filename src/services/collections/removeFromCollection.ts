import axios from 'axios';
import { Video } from '../../types/Video';
import { VideoCollection } from './../../types/VideoCollection';

export default function removeFromCollection(
  video: Video,
  collection: VideoCollection,
): Promise<boolean> {
  if (!collection.links.removeVideo) {
    return;
  }
  const url = collection.links.removeVideo.getTemplatedLink({
    video_id: video.id,
  });

  return axios
    .delete(url)
    .then(() => true)
    .catch(() => false);
}
