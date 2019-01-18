import moment from 'moment';
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
  return {
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
  };
}
