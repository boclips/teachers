import axios from 'axios';
import { Video } from 'src/types/Video';
import { VideoCollection } from 'src/types/VideoCollection';

export default function removeFromCollection(
  video: Video,
  collection: VideoCollection,
): Promise<boolean> {
  if (!collection.links.removeVideo) {
    return Promise.reject();
  }
  const url = collection.links.removeVideo.getTemplatedLink({
    video_id: video.id,
  });

  return axios
    .delete(url)
    .then(() => true)
    .catch(() => false);
}
