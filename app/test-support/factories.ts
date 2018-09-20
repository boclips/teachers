import moment = require('moment');
import { Link } from '../src/links/Link';
import { Links } from '../src/links/Links';
import { Video } from '../src/videos/Video';

export class VideoFactory {
  public static sample(arg: Partial<Video> = {}): Video {
    return Object.freeze({
      title: arg.title || 'my video title',
      description: arg.description || 'my video description',
      contentProvider: arg.contentProvider || 'Bodevs Productions',
      duration: arg.duration || moment.duration(2, 'minutes'),
      releasedOn: arg.releasedOn || new Date('2018-06-20T10:12:33'),
      thumbnailUrl: arg.thumbnailUrl || 'http://cdn.kaltura.com/thumbnail.jpg',
      streamUrl: arg.streamUrl || 'http://cdn.kaltura.com/stream.mdp',
    });
  }
}
export class LinksFactory {
  public static sample(arg: Partial<Links> = {}): Links {
    return Object.freeze({
      videos: arg.videos || new Link({ href: '/videos' }),
      video: arg.video || new Link({ href: '/videos/{id}', templated: true }),
      user: arg.user || new Link({ href: '/user' }),
      createEvent: arg.createEvent || new Link({ href: '/events' }),
    });
  }
}
