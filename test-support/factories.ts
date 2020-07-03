/* eslint-disable max-classes-per-file */
import { SubjectFactory as ApiClientSubjectFactory } from 'boclips-api-client/dist/test-support';
import {
  RouterActionType,
  RouterState as ReactRouterState,
} from 'connected-react-router';
import * as moment from 'moment';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { UserProfile, UserProfileLinks } from 'src/services/users/UserProfile';
import { AgeRange } from 'src/types/AgeRange';
import { Attachment } from 'src/types/Attachment';
import { Country } from 'src/types/Country';
import { Discipline } from 'src/types/Discipline';
import { Links } from 'src/types/Links';
import { School } from 'src/types/School';
import State, {
  CollectionSearchStateValue,
  CollectionsStateValue,
  EntityStateValue,
  LinksStateValue,
  Pageable,
  SearchStateValue,
  VideoSearchStateValue,
  VideosStateValue,
} from 'src/types/State';
import { Subject } from 'src/types/Subject';
import { Tag } from 'src/types/Tag';
import { Video, VideoId } from 'src/types/Video';
import {
  VideoCollection,
  VideoCollectionLinks,
} from 'src/types/VideoCollection';
import PageSpec from 'src/types/PageSpec';
import { VideoSearchRequest } from 'src/types/VideoSearchRequest';
import { VideoSearchFacets } from 'src/types/VideoSearchFacets';
import { defaultDurations } from 'src/components/durations/redux/durationReducer';
import { Link as ApiClientLink } from 'boclips-api-client/dist/sub-clients/common/model/LinkEntity';
import { Link } from 'src/types/Link';
import { ResourceType } from 'src/types/ResourceType';
import { video177 } from './api-responses';

export class VideoFactory {
  public static sample(arg: Partial<Video> = {}): Video {
    const id = arg.id || '123';
    return Object.freeze({
      id,
      title: arg.title || 'my video title',
      description: arg.description || 'my video description',
      additionalDescription:
        arg.additionalDescription || 'my additional video description',
      createdBy: arg.createdBy || 'Bodevs Productions',
      duration: arg.duration || moment.duration(2, 'minutes'),
      ageRange: arg.ageRange || new AgeRange(3, 5),
      releasedOn: arg.releasedOn || new Date('2018-06-20T10:12:33Z'),
      thumbnailUrl: arg.thumbnailUrl || 'http://cdn.kaltura.com/thumbnail.jpg',
      subjects: arg.subjects || [
        SubjectFactory.sample({ id: 'maths-subject-id', name: 'Maths' }),
      ],
      rating: arg.rating || null,
      attachments: arg.attachments || [],
      playback: arg.playback || {
        id: 'playbackid',
        type: 'STREAM',
        duration: undefined,
        links: {
          createPlayerInteractedWithEvent: new ApiClientLink({
            href: 'https://events',
          }),
          thumbnail: new ApiClientLink({
            href: "'http://cdn.kaltura.com/thumbnail.jpg'",
          }),
          hlsStream: new ApiClientLink({ href: 'https://streamurl' }),
        },
      },
      badges: arg.badges || ['ad-free'],
      bestFor: arg.bestFor || null,
      links: arg.links || {
        self: new Link({ href: `/v1/videos/${id}` }),
        rate: new Link({
          href: `/v1/videos/${id}?rating={rating}`,
          templated: true,
        }),
        validateShareCode: new Link({
          href: `/v1/videos/${id}/match?shareCode={shareCode}`,
          templated: true,
        }),
      },
      promoted: arg.promoted || false,
      contentWarnings: arg.contentWarnings || [],
    });
  }
}

export class VideoIdFactory {
  public static sample(arg: Partial<VideoId> = {}): VideoId {
    return Object.freeze({
      value: arg.value || '123',
      links: arg.links || {
        self: new Link({ href: '/v1/videos/123' }),
      },
    });
  }
}

export class VideoCollectionFactory {
  public static sample(arg: Partial<VideoCollection> = {}): VideoCollection {
    return Object.freeze({
      id: arg.id || '',
      title: arg.title || '',
      description: arg.description || '',
      updatedAt: arg.updatedAt || '',
      videoIds: arg.videoIds || [],
      links: arg.links || VideoCollectionLinksFactory.sample(),
      discoverable: arg.discoverable || false,
      isMine: typeof arg.isMine === 'undefined' ? true : arg.isMine,
      createdBy: 'Le Factory',
      subjects: arg.subjects || [],
      ageRange: arg.ageRange || new AgeRange(),
      subCollections: [],
      attachments: arg.attachments || [],
    });
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
      interactedWith: arg.interactedWith || undefined,
    });
  }
}

export class PageSpecFactory {
  public static sample(arg: Partial<PageSpec> = {}): PageSpec {
    return Object.freeze({
      number: arg.number || 0,
      size: arg.size || 10,
      totalElements: arg.totalElements || 0,
      totalPages: arg.totalPages || 0,
    });
  }
}

export class PageableCollectionsFactory {
  public static sample(arg: Partial<Pageable<string>> = {}): Pageable<string> {
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
  public static sample(arg: Partial<Links> = {}, prefix: string = ''): Links {
    return Object.freeze({
      videos:
        arg.videos ||
        new Link({
          href: `${prefix}/videos/{?query,sort_by,duration,duration_facets,duration_min,duration_max,released_date_from,released_date_to,source,age_range_min,age_range_max,age_range,age_range_facets,size,page,subject,subjects_set_manually,promoted,content_partner,type,is_classroom,resource_types,resource_type_facets}`,
          templated: true,
        }),
      searchCollections:
        arg.searchCollections ||
        new Link({
          href: `${prefix}/collections?query={query}`,
          templated: true,
        }),
      discoverCollections:
        arg.discoverCollections ||
        new Link({
          href: `${prefix}/collections?query={query}`,
          templated: true,
        }),
      video:
        arg.video ||
        new Link({ href: `${prefix}/videos/{id}`, templated: true }),
      createNoSearchResultsEvent:
        arg.createNoSearchResultsEvent ||
        new Link({ href: `${prefix}/events/xxx` }),
      activate: arg.activate,
      profile:
        arg.profile ||
        new Link({ href: `${prefix}/users/{id}`, templated: true }),
      createCollection:
        arg.createCollection || new Link({ href: `${prefix}/collections` }),
      myCollections:
        arg.myCollections ||
        new Link({ href: `${prefix}/users/userid/collections` }),
      promotedCollections:
        arg.promotedCollections ||
        new Link({ href: `${prefix}/collections?promoted` }),
      collection:
        arg.collection ||
        new Link({ href: `${prefix}/collections/{id}{?referer,shareCode}` }),
      createAccount: arg.createAccount || new Link({ href: `${prefix}/users` }),
      subjects: arg.subjects || new Link({ href: `${prefix}/subjects` }),
      tags: arg.tags || new Link({ href: `${prefix}/tags` }),
      disciplines:
        arg.disciplines || new Link({ href: `${prefix}/disciplines` }),
      countries: arg.countries || new Link({ href: `${prefix}/countries` }),
      validateShareCode:
        arg.validateShareCode ||
        new Link({
          href: `${prefix}/users/{id}/shareCode/{shareCode}`,
          templated: true,
        }),
    });
  }
}

export class LinksStateValueFactory {
  public static sample(
    arg: Partial<Links> = {},
    prefix: string = '',
  ): LinksStateValue {
    return Object.freeze({
      loadingState: 'success',
      entries: LinksFactory.sample(arg, prefix),
    });
  }

  public static sampleAnonymous(prefix: string = ''): Links {
    return Object.freeze({
      video: new Link({ href: `${prefix}/videos/{id}`, templated: true }),
      createNoSearchResultsEvent: new Link({ href: `` }),
      discoverCollections: new Link({
        href: `${prefix}/collections?projection=list&discoverable=true&page=0&size=30`,
        templated: false,
      }),
      createAccount: new Link({ href: `${prefix}/users`, templated: false }),
      subjects: new Link({ href: `${prefix}/subjects`, templated: false }),
    });
  }
}

export class UserProfileFactory {
  public static sample(arg: Partial<UserProfile> = {}): UserProfile {
    return Object.freeze({
      email: arg.email || 'joe@boclips.com',
      firstName: arg.firstName || 'joe',
      lastName: arg.lastName || 'boclips',
      id: arg.id || '1',
      links: arg.links || UserProfileLinksFactory.sample(),
      subjects: arg.subjects || ['subject-one-id', 'subject-two-id'],
      ages: arg.ages || [3, 4, 5, 6, 7, 8, 9],
      country: arg.country || { name: 'United States', id: 'USA' },
      state: arg.state || { name: 'New York', id: 'NY' },
      school: arg.school || SchoolFactory.sample(),
      shareCode: arg.shareCode || 'SH4R',
      role: arg.role || 'TEACHER',
    });
  }
}

export class SchoolFactory {
  public static sample(arg: Partial<School> = {}): School {
    return Object.freeze({
      id: arg.id || '123',
      name: arg.name || 'My school',
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
      videoIds: [],
      paging: {
        number: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
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
      collectionIds: [],
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
    const collection = VideoCollectionFactory.sample();

    return Object.freeze({
      loading: false,
      updating: false,
      myCollections: { items: [collection.id], links: {} },
      discoverCollections: {
        items: [],
        links: {},
      },
      promotedCollections: {
        items: [],
        links: {},
      },
      myResources: {
        items: [],
        links: {},
      },
      collectionIdBeingViewed: collection.id,
      ...arg,
    });
  }
}

export class SubjectFactory {
  public static sample(arg: Partial<Subject> = {}): Subject {
    return Object.freeze<Subject>(ApiClientSubjectFactory.sample(arg));
  }
}

export class SubjectsFactory {
  public static sample(arg: Subject[] = []): Subject[] {
    return Object.freeze([
      ApiClientSubjectFactory.sample({
        id: 'subject-one-id',
        name: 'subject one',
      }),
      ApiClientSubjectFactory.sample({
        id: 'subject-two-id',
        name: 'subject two',
      }),
      ...arg,
    ]) as Subject[];
  }
}

export class AgeRangeFactory {
  public static sample(): AgeRange[] {
    return Object.freeze([
      new AgeRange(3, 5),
      new AgeRange(5, 9),
      new AgeRange(9, 11),
      new AgeRange(11, 14),
      new AgeRange(14, 16),
      new AgeRange(16),
    ]) as AgeRange[];
  }
}

export class ResourceTypesFactory {
  public static sample(): ResourceType[] {
    return Object.freeze([
      { label: 'Activity', value: 'ACTIVITY' },
    ]) as ResourceType[];
  }
}

export class CountriesFactory {
  public static sample(arg: Country[] = []): Country[] {
    return [
      {
        id: 'country-one-id',
        name: 'country one',
        links: { schools: new Link({ href: '' }) },
      },
      {
        id: 'country-two-id',
        name: 'country two',
        links: { schools: new Link({ href: '' }) },
      },
      ...arg,
    ];
  }
}

export class CountryFactory {
  public static sample(arg: Partial<Country> = {}): Country {
    return Object.freeze({
      id: arg.id || 'id',
      name: arg.name || 'name',
      states: arg.states || undefined,
      links: arg.links || { schools: new Link({ href: '' }) },
    });
  }
}

export class SchoolsFactory {
  public static sample(arg: School[] = []): School[] {
    return [
      {
        id: 'school-one-id',
        name: 'school one',
      },
      {
        id: 'school-two-id',
        name: 'school two',
      },
      ...arg,
    ];
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
      {
        id: 'discipline-three-id',
        name: 'discipline three',
      },
      {
        id: 'discipline-four-id',
        name: 'discipline four',
      },
      {
        id: 'discipline-five-id',
        name: 'discipline five',
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

export class VideosStateFactory {
  public static sample(arg: Partial<VideosStateValue> = {}): VideosStateValue {
    return Object.freeze({
      promotedVideoIds: [],
      ...arg,
    }) as VideosStateValue;
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

export class EntitiesFactory {
  public static sample(arg: Partial<EntityStateValue> = {}): EntityStateValue {
    return Object.freeze({
      collections: {
        byId: {},
      },
      videos: {
        byId: {},
        promotedVideos: [],
      },
      ...arg,
    });
  }
}

export class MockStoreFactory {
  public static sample(state: Partial<State> = {}): MockStoreEnhanced<State> {
    const mockStoreCreator = configureStore<State>();

    return mockStoreCreator(MockStoreFactory.sampleState(state));
  }

  public static sampleState = (state: Partial<State> = {}): State => {
    const collections = state.collections || CollectionsFactory.sample();

    const allCollections = [
      ...(collections.discoverCollections
        ? collections.discoverCollections.items
        : []),
      ...(collections.myCollections ? collections.myCollections.items : []),
      ...(collections.discoverCollections
        ? collections.discoverCollections.items
        : []),
    ];

    if (collections.collectionIdBeingViewed) {
      allCollections.push(collections.collectionIdBeingViewed);
    }

    const collectionsById = allCollections.reduce((result, id) => {
      result[id] = VideoCollectionFactory.sample({ id });
      return result;
    }, {});

    return {
      entities: EntitiesFactory.sample({
        ...state.entities,
        collections: {
          byId: collectionsById,
        },
      }),
      apiPrefix: 'https://api.example.com',
      links: LinksStateValueFactory.sample(),
      search: SearchFactory.sample(),
      user: UserProfileFactory.sample(),
      video: {
        loading: false,
        id: VideoIdFactory.sample(),
      },
      authentication: {
        status: 'authenticated',
      },
      collections,
      router: RouterFactory.sample(),
      subjects: SubjectsFactory.sample(),
      ageRanges: AgeRangeFactory.sample(),
      durations: defaultDurations,
      countries: CountriesFactory.sample(),
      disciplines: DisciplinesFactory.sample(),
      tags: TagsFactory.sample(),
      videos: VideosStateFactory.sample(),
      resourceTypes: ResourceTypesFactory.sample(),
      ...state,
    };
  };
}

export interface VideoResource {
  bestFor: Array<{ label: string }>;
  _links: {
    logInteraction: { href: string };
    rate: { templated: boolean; href: string };
    self: { href: string };
    tag: { href: string };
  };
  subjects: Array<{ name: string; id: string }>;
  rating: number;
  description: string;
  additionalDescription?: string;
  title: string;
  type: { name: string; id: number };
  releasedOn: string;
  badges: string[];
  createdBy: string;
  playback: {
    duration: string;
    type: string;
    _links?: {
      thumbnail: {
        href: string;
        templated: boolean;
      };
    };
  };
  id: string;
  yourRating: number;
  promoted: boolean;
}

export class VideoResourceFactory {
  public static sample(resource: Partial<VideoResource>): VideoResource {
    return { ...video177, ...resource };
  }
}

export class VideoSearchRequestFactory {
  public static sample(
    resource?: Partial<VideoSearchRequest>,
  ): VideoSearchRequest {
    return {
      page: undefined,
      filters: {
        duration: [],
        resource_types: [],
      },
      sortBy: undefined,
      ...resource,
    };
  }
}

export class VideoSearchFacetsFactory {
  public static sample(
    resource?: Partial<VideoSearchFacets>,
  ): VideoSearchFacets {
    return {
      ageRanges: [new AgeRange(3, 7)],
      durations: defaultDurations,
      resourceTypes: [{ label: 'Activity', value: 'ACTIVITY' }],
      ...resource,
    };
  }
}
