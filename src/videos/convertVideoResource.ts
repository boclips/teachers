import moment from 'moment';
import { StreamPlayback, Video } from './Video';

export default function convertVideoResource(resource: any): Video {
  const playback: StreamPlayback = new StreamPlayback(
    resource.playback.streamUrl,
  );

  return {
    id: resource.id,
    title: resource.title,
    description: resource.description,
    duration: moment.duration(resource.playback.duration),
    releasedOn: new Date(resource.releasedOn),
    contentProvider: resource.contentProvider,
    thumbnailUrl: resource.playback.thumbnailUrl,
    playback,
  };
}
