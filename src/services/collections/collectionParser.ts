import { Link } from '../../types/Link';
import { Scrollable } from '../../types/State';
import { VideoId } from '../../types/Video';
import { VideoCollection } from './../../types/VideoCollection';

export const parseCollectionResponse = (response: any): VideoCollection => {
  return parseCollectionListResponse(response.data);
};

export const parseScrollableCollectionsListResponse = (
  response: any,
): Scrollable<VideoCollection> => ({
  items: parseCollectionsListResponse(response),
  links: {
    next:
      response &&
      response.data &&
      response.data._links &&
      response.data._links.next
        ? new Link(response.data._links.next)
        : undefined,
  },
});

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
    addVideo: data._links.addVideo ? new Link(data._links.addVideo) : undefined,
    removeVideo: data._links.removeVideo
      ? new Link(data._links.removeVideo)
      : undefined,
    edit: data._links.edit ? new Link(data._links.edit) : undefined,
    remove: data._links.remove ? new Link(data._links.remove) : undefined,
    self: data._links.self ? new Link(data._links.self) : undefined,
  };
};
