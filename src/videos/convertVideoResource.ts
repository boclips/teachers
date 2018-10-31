import moment from 'moment';
import { Video } from './Video';

export default function convertVideoResource(resource: any): Video {
  return {
    id: resource.id,
    title: resource.title,
    description: resource.description,
    duration: moment.duration(resource.duration),
    releasedOn: new Date(resource.releasedOn),
    contentProvider: resource.contentProvider,
    thumbnailUrl: resource.thumbnailUrl,
    streamUrl: resource.streamUrl,
  };
}
