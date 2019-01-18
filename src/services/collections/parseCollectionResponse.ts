import { Link } from '../../types/Link';
import convertVideoResource from '../videos/convertVideoResource';
import { VideoCollection } from './../../types/VideoCollection';

export const parseCollectionResponse = (response: any): VideoCollection => {
  const videos = response.data.videos.map(convertVideoResource);
  const addVideoUrl = response.data._links.addVideo;

  return {
    videos,
    links: {
      addVideo: new Link(addVideoUrl),
    },
  };
};
