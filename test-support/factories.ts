import moment = require('moment');
import { UserProfile } from '../src/services/users/UserProfile';
import { Link } from '../src/types/Link';
import { Links } from '../src/types/Links';
import { Pageable } from '../src/types/State';
import { StreamPlayback, Video, VideoId } from '../src/types/Video';
import { UserProfileLinks } from './../src/services/users/UserProfile';
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
      createdBy: 'Le Factory',
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
      bookmark: arg.bookmark || undefined,
      unbookmark: arg.unbookmark || undefined,
    });
  }
}

export class PageableCollectionsFactory {
  public static sample(
    arg: Partial<Pageable<VideoCollection>> = {},
  ): Pageable<VideoCollection> {
    return Object.freeze({
      items: arg.items || [],
      links: { next: (arg.links && arg.links.next) || undefined },
    });
  }
}

export class UserProfileLinksFactory {
  public static sample(arg: Partial<UserProfileLinks> = {}): UserProfileLinks {
    return Object.freeze({
      self:
        arg.self ||
        new Link({
          href: '/v1/users/1',
          templated: false,
        }),
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
      profile:
        arg.profile || new Link({ href: '/v1/users/{id}', templated: true }),
      collections: arg.collections || new Link({ href: '/collections' }),
      myCollections:
        arg.myCollections || new Link({ href: '/collections?owner=abc' }),
      publicCollections:
        arg.publicCollections || new Link({ href: '/collections?public' }),
      bookmarkedCollections:
        arg.publicCollections || new Link({ href: '/collections?bookmarked' }),
      collection: arg.collection || new Link({ href: '/collections/xxx' }),
      createAccount: arg.createAccount || new Link({ href: '/users' }),
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
      analyticsId: arg.analyticsId || 'mixpanel-123',
      id: arg.id || '1',
      links: arg.links || UserProfileLinksFactory.sample(),
    });
  }
}
