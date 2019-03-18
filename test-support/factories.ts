import moment = require('moment');
import { UserProfile } from '../src/services/analytics/UserProfile';
import { Link } from '../src/types/Link';
import { Links } from '../src/types/Links';
import { RawLinks } from '../src/types/RawLinks';
import { StreamPlayback, Video, VideoId } from '../src/types/Video';
import {
  VideoCollection,
  VideoCollectionLinks,
  VideoMap,
} from './../src/types/VideoCollection';

export class VideoFactory {
  public static sample(arg: Partial<Video> = {}): Video {
    return Object.freeze({
      id: arg.id || '123',
      title: arg.title || 'my video title',
      description: arg.description || 'my video description',
      contentPartner: arg.contentPartner || 'Bodevs Productions',
      duration: arg.duration || moment.duration(2, 'minutes'),
      releasedOn: arg.releasedOn || new Date('2018-06-20T10:12:33Z'),
      thumbnailUrl: arg.thumbnailUrl || 'http://cdn.kaltura.com/thumbnail.jpg',
      subjects: arg.subjects || ['Maths'],
      playback:
        (arg.playback as StreamPlayback) ||
        new StreamPlayback('http://cdn.kaltura.com/stream.mdp'),
      badges: arg.badges || ['ad-free'],
      type: arg.type || { name: 'educational' },
      links: arg.links || {
        self: new Link({ href: '/v1/videos/123' }),
      },
    });
  }
}

export class VideoIdFactory {
  public static sample(arg: Partial<VideoId> = {}): VideoId {
    return Object.freeze({
      id: arg.id || '123',
      links: arg.links || {
        self: new Link({ href: '/v1/videos/123' }),
      },
    });
  }
}

export class VideoCollectionFactory {
  public static sample(arg: Partial<VideoCollection> = {}): VideoCollection {
    const videos = arg.videos || {};
    return Object.freeze({
      id: arg.id || '',
      title: arg.title || '',
      updatedAt: arg.updatedAt || '',
      videos,
      videoIds:
        arg.videoIds ||
        Object.keys(videos)
          .map(videoId => videos[videoId])
          .map(video => ({
            id: video.id,
            links: video.links,
          })),
      links: arg.links || VideoCollectionLinksFactory.sample(),
      isPublic: arg.isPublic || false,
    });
  }

  public static sampleVideos(videos: Video[]): VideoMap {
    return videos.reduce((map, video) => {
      map[video.id] = video;
      return map;
    }, {});
  }
}

export class VideoCollectionLinksFactory {
  public static sample(
    arg: Partial<VideoCollectionLinks> = {},
  ): VideoCollectionLinks {
    return Object.freeze({
      self:
        arg.self ||
        new Link({
          href: '/v1/collections/default',
          templated: false,
        }),
      addVideo: arg.addVideo || undefined,
      removeVideo: arg.removeVideo || undefined,
      edit: arg.edit || undefined,
      remove: arg.remove || undefined,
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
      collections: arg.collections || new Link({ href: '/collections' }),
      userCollectionsList:
        arg.userCollectionsList ||
        new Link({ href: '/collections?projection=list' }),
      publicCollections:
        arg.publicCollections || new Link({ href: '/collections?public' }),
      collection: arg.collection || new Link({ href: '/collections/xxx' }),
    });
  }
}

export class UserProfileFactory {
  public static sample(arg: Partial<UserProfile> = {}): UserProfile {
    return Object.freeze({
      authenticated: arg.authenticated || true,
      email: arg.email || 'joe@boclips.com',
      firstName: arg.firstName || 'joe',
      lastName: arg.lastName || 'boclips',
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
        userCollection: arg.userCollection || {
          href: '/collections/xxx',
        },
        userCollections: arg.userCollectionsDetails || {
          href: '/collections',
        },
      },
    });
  }
}
