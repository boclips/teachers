import moment = require('moment');
import { Link } from '../src/links/Link';
import { Links } from '../src/links/Links';
import { RawLinks } from '../src/links/RawLinks';
import { StreamPlayback, Video } from '../src/videos/Video';

export class VideoFactory {
  public static sample(arg: Partial<Video> = {}): Video {
    return Object.freeze({
      id: arg.id || '123',
      title: arg.title || 'my video title',
      description: arg.description || 'my video description',
      contentProvider: arg.contentProvider || 'Bodevs Productions',
      duration: arg.duration || moment.duration(2, 'minutes'),
      releasedOn: arg.releasedOn || new Date('2018-06-20T10:12:33'),
      thumbnailUrl: arg.thumbnailUrl || 'http://cdn.kaltura.com/thumbnail.jpg',
      playback:
        (arg.playback as StreamPlayback) ||
        new StreamPlayback('http://cdn.kaltura.com/stream.mdp'),
    });
  }
}

export class LinksFactory {
  public static sample(arg: Partial<Links> = {}): Links {
    return Object.freeze({
      videos: arg.videos || new Link({ href: '/videos' }),
      video: arg.video || new Link({ href: '/videos/{id}', templated: true }),
      createPlaybackEvent:
        arg.createPlaybackEvent || new Link({ href: '/events' }),
      createNoSearchResultsEvent:
        arg.createNoSearchResultsEvent || new Link({ href: '/events/xxx' }),
      activate: arg.activate,
      profile: arg.profile,
    });
  }
}

export class LinksResponseFactory {
  public static sample(arg: Partial<RawLinks> = {}): any {
    return Object.freeze({
      _links: {
        search: arg.search || { href: '/videos' },
        video: arg.video || { href: '/videos/{id}', templated: true },
        createPlaybackEvent: arg.createPlaybackEvent || { href: '/events' },
        createNoSearchResultsEvent: arg.createNoSearchResultsEvent || {
          href: '/events/xxx',
        },
        activate: arg.activate,
        profile: arg.profile,
      },
    });
  }
}
