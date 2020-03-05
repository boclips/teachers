import moment from 'moment';
import { AgeRange } from 'src/types/AgeRange';
import { Link } from '../../types/Link';
import { StreamPlayback, Video, YoutubePlayback } from '../../types/Video';

const DEFAULT_THUMBNAIL_WIDTH = 500;

function getPlaybackProperties(
  resource: any,
): StreamPlayback | YoutubePlayback {
  if (resource.playback.type === 'STREAM') {
    return new StreamPlayback(resource.playback._links.hlsStream.href);
  } else if (resource.playback.type === 'YOUTUBE') {
    return new YoutubePlayback(resource.playback.id);
  } else {
    throw Error(`No valid playback object found on resource: ${resource}`);
  }
}

function getEffectiveThumbnailUrl(resource: any) {
  const thumbnailLink = new Link(resource.playback._links.thumbnail);
  return thumbnailLink.isTemplated
    ? thumbnailLink.getTemplatedLink({
        thumbnailWidth: DEFAULT_THUMBNAIL_WIDTH,
      })
    : thumbnailLink.getOriginalLink();
}

export default function convertVideoResource(resource: any): Video {
  const video: Video = {
    id: resource.id,
    title: resource.title,
    description: resource.description,
    duration: moment.duration(resource.playback.duration),
    releasedOn: new Date(resource.releasedOn),
    createdBy: resource.createdBy,
    thumbnailUrl: getEffectiveThumbnailUrl(resource),
    playback: getPlaybackProperties(resource),
    subjects: resource.subjects,
    badges: resource.badges,
    ageRange:
      resource.ageRange &&
      new AgeRange(resource.ageRange.min, resource.ageRange.max),
    rating: resource.rating,
    yourRating: resource.yourRating,
    bestFor:
      (resource.bestFor && resource.bestFor[0] && resource.bestFor[0].label) ||
      null,
    promoted: resource.promoted,
    links: {
      self: new Link(resource._links.self),
      rate: resource._links.rate ? new Link(resource._links.rate) : null,
      tag: resource._links.tag ? new Link(resource._links.tag) : null,
      logInteraction: resource._links.logInteraction
        ? new Link(resource._links.logInteraction)
        : null,
    },
  };

  if (resource._links.transcript) {
    video.links.transcript = new Link(resource._links.transcript);
  }

  return video;
}
