import { Link } from '../../types/Link';
import convertVideoResource from '../videos/convertVideoResource';
import { VideoCollection } from './../../types/VideoCollection';

export const parseCollectionResponse = (response: any): VideoCollection => {
  const videos = response.data.videos.map(convertVideoResource);
  const addVideoUrl = response.data._links.addVideo;
  const removeVideoUrl = response.data._links.removeVideo;

  return {
    videos,
    links: {
      addVideo: new Link(addVideoUrl),
      removeVideo: new Link(removeVideoUrl),
    },
  };
};
