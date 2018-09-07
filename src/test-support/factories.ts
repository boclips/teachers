import moment = require('moment');
import { Video } from '../search-videos/Video';

export class VideoFactory {
  public static sample(arg: Partial<Video>): Video {
    return Object.freeze({
      title: arg.title || 'my video title',
      description: arg.description || 'my video description',
      contentProvider: arg.contentProvider || 'Bodevs Productions',
      duration: arg.duration || moment.duration(2, 'minutes'),
      releasedOn: arg.releasedOn || new Date('2018-06-20T10:12:33'),
    });
  }
}
