import moment from 'moment';
import { Link } from '../../types/Link';
import { StreamPlayback, Video, YoutubePlayback } from '../../types/Video';

function getPlaybackProperties(
  resource: any,
): StreamPlayback | YoutubePlayback {
  if (resource.playback.type === 'STREAM') {
    return new StreamPlayback(resource.playback.streamUrl);
  } else if (resource.playback.type === 'YOUTUBE') {
    return new YoutubePlayback(resource.playback.id);
  } else {
    throw Error(`No valid playback object found on resource: ${resource}`);
  }
}

export default function convertVideoResource(resource: any): Video {
  const video: Video = {
    id: resource.id,
    title: resource.title,
    description: resource.description,
    duration: moment.duration(resource.playback.duration),
    releasedOn: new Date(resource.releasedOn),
    contentPartner: resource.contentPartner,
    thumbnailUrl: resource.playback.thumbnailUrl,
    playback: getPlaybackProperties(resource),
    subjects: resource.subjects,
    badges: resource.badges,
    type: { name: resource.type.name },
    links: {
      self: new Link(resource._links.self),
    },
  };

  if (resource._links.transcript) {
    video.links.transcript = new Link(resource._links.transcript);
  }

  return video;
}
