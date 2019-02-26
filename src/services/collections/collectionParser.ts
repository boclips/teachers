import { Link } from '../../types/Link';
import convertVideoResource from '../videos/convertVideoResource';
import { VideoCollection } from './../../types/VideoCollection';

export const parseCollectionResponse = (response: any): VideoCollection => {
  return doParseCollectionResponse(response.data);
};

export const parseCollectionsResponse = (response: any): VideoCollection[] => {
  return (
    (response &&
      response.data &&
      response.data._embedded &&
      response.data._embedded.collections &&
      response.data._embedded.collections.map(doParseCollectionResponse)) ||
    []
  );
};

const doParseCollectionResponse = (data: any): VideoCollection => {
  const id = data.id;
  const title = data.title;
  const updatedAt = data.updatedAt;
  const videos = data.videos.map(convertVideoResource);
  return {
    id,
    title,
    videos,
    updatedAt,
    links: {
      addVideo: new Link(data._links.addVideo),
      removeVideo: new Link(data._links.removeVideo),
      self: new Link(data._links.self),
    },
  };
};
