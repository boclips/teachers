import { AgeRange } from '../../types/AgeRange';
import { Attachment } from '../../types/Attachment';
import { Link, RawLink } from '../../types/Link';
import { Pageable } from '../../types/State';
import { VideoId } from '../../types/Video';
import { VideoCollection } from '../../types/VideoCollection';

export const parseCollectionResponse = (response: any): VideoCollection =>
  parseCollectionListResponse(response.data);

export const parseScrollableCollectionsListResponse = (
  response: any,
): Pageable<VideoCollection> => ({
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
): VideoCollection[] =>
  (response &&
    response.data &&
    response.data._embedded &&
    response.data._embedded.collections &&
    response.data._embedded.collections.map(parseCollectionListResponse)) ||
  [];

const parseCollectionListResponse = (data: any): VideoCollection => {
  const videoIds: VideoId[] = data.videos.map(
    (videoData: any): VideoId => ({
      value: videoData.id,
      links: { self: parseLink(videoData._links.self) },
    }),
  );

  let attachments = [];

  if (data.attachments) {
    attachments = data.attachments.map(parseAttachment);
  }

  return {
    id: data.id,
    title: data.title,
    updatedAt: data.updatedAt,
    videoIds,
    links: getLinks(data),
    isPublic: data.public,
    isMine: data.mine,
    createdBy: data.createdBy,
    subjects: data.subjects.map(subject => subject.id),
    ageRange: data.ageRange
      ? new AgeRange(data.ageRange.min, data.ageRange.max)
      : new AgeRange(),
    description: data.description,
    attachments,
  };
};

const getLinks = (data: any) => ({
  addVideo: parseLink(data._links.addVideo),
  removeVideo: parseLink(data._links.removeVideo),
  edit: parseLink(data._links.edit),
  remove: parseLink(data._links.remove),
  bookmark: parseLink(data._links.bookmark),
  unbookmark: parseLink(data._links.unbookmark),
  self: parseLink(data._links.self),
  interactedWith: parseLink(data._links.interactedWith),
});

const parseAttachment = (attachment): Attachment => ({
  id: attachment.id,
  description: attachment.description,
  type: attachment.type,
  links: {
    download: parseLink(attachment._links.download),
  },
});

const parseLink = (data: undefined | RawLink) =>
  data ? new Link(data) : undefined;
