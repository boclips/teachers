import {
  RouterActionType,
  RouterState as ReactRouterState,
} from 'connected-react-router';
import * as moment from 'moment';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { UserProfileLinks } from '../src/services/users/UserProfile';
import { UserProfile } from '../src/services/users/UserProfile';
import { AgeRange } from '../src/types/AgeRange';
import { Attachment } from '../src/types/Attachment';
import { Country } from '../src/types/Country';
import { Discipline } from '../src/types/Discipline';
import { Link } from '../src/types/Link';
import { Links } from '../src/types/Links';
import State, {
  CollectionSearchStateValue,
  CollectionsStateValue,
  Pageable,
  SearchStateValue,
  VideoSearchStateValue,
} from '../src/types/State';
import { Subject } from '../src/types/Subject';
import { Tag } from '../src/types/Tag';
import { StreamPlayback, Video, VideoId } from '../src/types/Video';
import {
  VideoCollection,
  VideoCollectionLinks,
  VideoMap,
} from '../src/types/VideoCollection';

export class VideoFactory {
  public static sample(arg: Partial<Video> = {}): Video {
    const id = arg.id || '123';
    return Object.freeze({
      id,
      title: arg.title || 'my video title',
      description: arg.description || 'my video description',
      createdBy: arg.createdBy || 'Bodevs Productions',
      duration: arg.duration || moment.duration(2, 'minutes'),
      releasedOn: arg.releasedOn || new Date('2018-06-20T10:12:33Z'),
      thumbnailUrl: arg.thumbnailUrl || 'http://cdn.kaltura.com/thumbnail.jpg',
      subjects: arg.subjects || [{ id: 'maths-subject-id', name: 'Maths' }],
      rating: arg.rating || null,
      playback:
        (arg.playback as StreamPlayback) ||
        new StreamPlayback('http://cdn.kaltura.com/stream.mdp'),
      badges: arg.badges || ['ad-free'],
      bestFor: arg.bestFor || null,
      links: arg.links || {
        self: new Link({ href: `/v1/videos/${id}` }),
        rate: new Link({
          href: `/v1/videos/${id}?rating={rating}`,
          templated: true,
        }),
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
      isMine: typeof arg.isMine === 'undefined' ? true : arg.isMine,
      createdBy: 'Le Factory',
      subjects: arg.subjects || [],
      ageRange: arg.ageRange || new AgeRange(),
      attachments: arg.attachments || [],
    });
  }

  public static sampleVideos(videos: Video[]): VideoMap {
    return videos.reduce((map, video) => {
      map[video.id] = video;
      return map;
    }, {});
  }
}

export class AttachmentFactory {
  public static sample = (arg: Partial<Attachment> = {}): Attachment => ({
    id: 'attachment-id',
    description: '1. Point 1\n1. Point 2\n1. Point 3',
    type: 'LESSON_PLAN',
    links: {
      download: new Link({ href: 'http://google.com' }),
    },
    ...arg,
  });
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
      searchCollections:
        arg.searchCollections ||
        new Link({ href: '/collections?query={query}', templated: true }),
      discoverCollections:
        arg.discoverCollections ||
        new Link({ href: '/collections?query={query}', templated: true }),
      video: arg.video || new Link({ href: '/videos/{id}', templated: true }),
      createPlaybackEvent:
        arg.createPlaybackEvent || new Link({ href: '/events' }),
      createNoSearchResultsEvent:
        arg.createNoSearchResultsEvent || new Link({ href: '/events/xxx' }),
      activate: arg.activate,
      profile:
        arg.profile || new Link({ href: '/v1/users/{id}', templated: true }),
      createCollection:
        arg.createCollection || new Link({ href: '/collections' }),
      myCollections:
        arg.myCollections || new Link({ href: '/collections?owner=abc' }),
      publicCollections:
        arg.publicCollections || new Link({ href: '/collections?public' }),
      bookmarkedCollections:
        arg.publicCollections || new Link({ href: '/collections?bookmarked' }),
      collection: arg.collection || new Link({ href: '/collections/xxx' }),
      createAccount: arg.createAccount || new Link({ href: '/users' }),
      subjects: arg.subjects || new Link({ href: '/subjects' }),
      tags: arg.tags || new Link({ href: '/tags' }),
      disciplines: arg.disciplines || new Link({ href: '/disciplines' }),
      countries: arg.countries || new Link({ href: '/countries' }),
    });
  }
}

export class UserProfileFactory {
  public static sample(arg: Partial<UserProfile> = {}): UserProfile {
    return Object.freeze({
      email: arg.email || 'joe@boclips.com',
      firstName: arg.firstName || 'joe',
      lastName: arg.lastName || 'boclips',
      analyticsId: arg.analyticsId || 'mixpanel-123',
      id: arg.id || '1',
      links: arg.links || UserProfileLinksFactory.sample(),
    });
  }
}
export class LoginFactory {
  public static sample(arg: Partial<UserProfile> = {}): UserProfile {
    return Object.freeze({
      email: arg.email || 'joe@boclips.com',
      firstName: arg.firstName || 'joe',
      lastName: arg.lastName || 'boclips',
      analyticsId: arg.analyticsId || 'mixpanel-123',
      id: arg.id || '1',
      links: arg.links || UserProfileLinksFactory.sample(),
    });
  }
}

export class SearchFactory {
  public static sample(arg: Partial<SearchStateValue> = {}): SearchStateValue {
    return Object.freeze({
      videoSearch: VideoSearchFactory.sample(),
      collectionSearch: CollectionSearchFactory.sample(),
      ...arg,
    });
  }
}

export class VideoSearchFactory {
  public static sample(
    arg: Partial<VideoSearchStateValue> = {},
  ): VideoSearchStateValue {
    return Object.freeze({
      query: 'hello',
      videos: [],
      paging: {
        number: 1,
        size: 10,
        totalElements: 10,
        totalPages: 10,
      },
      loading: false,
      ...arg,
    });
  }
}

export class CollectionSearchFactory {
  public static sample(
    arg: Partial<CollectionSearchStateValue> = {},
  ): CollectionSearchStateValue {
    return Object.freeze({
      query: 'hello',
      collections: [],
      loading: false,
      ...arg,
    });
  }
}

export class RouterFactory {
  public static sample(arg: Partial<ReactRouterState> = {}): ReactRouterState {
    return Object.freeze({
      location: {
        pathname: '',
        search: `?q=hi`,
        hash: '',
        state: null,
      },
      action: 'PUSH' as RouterActionType,
      ...arg,
    });
  }
}

export class CollectionsFactory {
  public static sample(
    arg: Partial<CollectionsStateValue> = {},
  ): CollectionsStateValue {
    return Object.freeze({
      loading: false,
      updating: false,
      myCollections: { items: [VideoCollectionFactory.sample()], links: {} },
      publicCollections: {
        items: [],
        links: {},
      },
      discoverCollections: {
        items: [],
        links: {},
      },
      bookmarkedCollections: {
        items: [],
        links: {},
      },
      collectionBeingViewed: VideoCollectionFactory.sample(),
      ...arg,
    });
  }
}

export class SubjectFactory {
  public static sample(arg: Partial<Subject> = {}): Subject {
    return Object.freeze({
      id: arg.id || 'id',
      name: arg.name || 'name',
    });
  }
}

export class SubjectsFactory {
  public static sample(arg: Subject[] = []): Subject[] {
    return Object.freeze([
      {
        id: 'subject-one-id',
        name: 'subject one',
      },
      {
        id: 'subject-two-id',
        name: 'subject two',
      },
      ...arg,
    ]) as Subject[];
  }
}

export class CountriesFactory {
  public static sample(arg: Country[] = []): Country[] {
    return Object.freeze([
      {
        id: 'country-one-id',
        name: 'country one',
      },
      {
        id: 'country-two-id',
        name: 'country two',
      },
      ...arg,
    ]) as Country[];
  }
}

export class DisciplineFactory {
  public static sample(arg: Partial<Discipline> = {}): Discipline {
    return Object.freeze({
      id: arg.id || 'id',
      code: arg.code || 'code',
      name: arg.name || 'name',
      subjects: arg.subjects || [],
    });
  }
}

export class DisciplinesFactory {
  public static sample(arg: Discipline[] = []): Discipline[] {
    return Object.freeze([
      {
        id: 'discipline-one-id',
        name: 'discipline one',
      },
      {
        id: 'discipline-two-id',
        name: 'discipline two',
      },
      ...arg,
    ]) as Discipline[];
  }
}

export class TagsFactory {
  public static sample(arg: Tag[] = []): Tag[] {
    return Object.freeze([
      {
        id: 'tag-one-id',
        label: 'tag one',
        links: {
          self: new Link({ href: 'http://localhost/v1/tags/1' }),
        },
      },
      {
        id: 'tag-two-id',
        label: 'tag two',
        links: {
          self: new Link({ href: 'http://localhost/v1/tags/2' }),
        },
      },
      ...arg,
    ]) as Tag[];
  }
}

export class TagFactory {
  public static sample(arg: Partial<Tag> = {}): Tag {
    return Object.freeze({
      id: 'tag-one-id',
      label: 'tag one',
      links: {
        self: new Link({ href: 'http://localhost/v1/tags/1' }),
      },
      ...arg,
    }) as Tag;
  }
}

export class MockStoreFactory {
  public static sample(store: Partial<State> = {}): MockStoreEnhanced<State> {
    const mockStoreCreator = configureStore<State>();

    return mockStoreCreator({
      apiPrefix: 'https://api.example.com',
      links: LinksFactory.sample(),
      search: SearchFactory.sample(),
      user: UserProfileFactory.sample(),
      video: {
        loading: false,
        item: VideoFactory.sample(),
      },
      authentication: {
        status: 'authenticated',
      },
      collections: CollectionsFactory.sample(),
      router: RouterFactory.sample(),
      subjects: SubjectsFactory.sample(),
      countries: CountriesFactory.sample(),
      disciplines: DisciplinesFactory.sample(),
      tags: TagsFactory.sample(),
      ageRanges: [],
      ...store,
    });
  }
}
