import { Link } from '../../types/Link';
import { VideoId } from '../../types/Video';
import { VideoCollection } from './../../types/VideoCollection';

export const parseCollectionResponse = (response: any): VideoCollection => {
  return doParseCollectionResponse(response.data);
};

export const parseCollectionsListResponse = (
  response: any,
): VideoCollection[] => {
  return (
    (response &&
      response.data &&
      response.data._embedded &&
      response.data._embedded.collections &&
      response.data._embedded.collections.map(parseCollectionListResponse)) ||
    []
  );
};

const doParseCollectionResponse = (data: any): VideoCollection => {
  const id = data.id;
  const title = data.title;
  const updatedAt = data.updatedAt;
  return {
    id,
    title,
    videos: {},
    videoIds: [],
    updatedAt,
    links: getLinks(data),
    isPublic: data.public,
  };
};

const parseCollectionListResponse = (data: any): VideoCollection => {
  const videoIds: VideoId[] = data.videos.map(
    (videoData: any): VideoId => ({
      id: videoData.id,
      links: { self: new Link(videoData._links.self) },
    }),
  );

  return {
    id: data.id,
    title: data.title,
    updatedAt: data.updatedAt,
    videos: {},
    videoIds,
    links: getLinks(data),
    isPublic: data.public,
  };
};

const getLinks = (data: any) => {
  return {
    addVideo: new Link(data._links.addVideo),
    removeVideo: new Link(data._links.removeVideo),
    edit: new Link(data._links.edit),
    remove: new Link(data._links.remove),
    self: new Link(data._links.self),
  };
};
