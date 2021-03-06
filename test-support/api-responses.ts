import { UserFeatureKey } from 'src/services/users/UserProfile';

const prefix = 'https://api.example.com';

export function buildVideoSearchResponse(videos: any[], facets: any = {}) {
  return {
    _embedded: {
      videos,
      facets,
    },
    page: {
      size: 10,
      totalElements: 2,
      totalPages: 1,
      number: 0,
    },
  };
}

export const links = {
  _links: {
    searchVideos: {
      href: `${prefix}/v1/videos{?query,sort_by,include_tag,exclude_tag,duration_min,duration_max,released_date_from,released_date_to,source,age_range_min,age_range_max,size,page,subject,promoted}`,
      templated: true,
    },
    video: {
      href: `${prefix}/v1/videos/{id}`,
      templated: true,
    },
    searchCollections: {
      href: `${prefix}/v1/collections{?query,subject,age_range_min,age_range_max}`,
      templated: true,
    },
    collection: {
      href: `${prefix}/v1/collections/{id}`,
      templated: true,
    },
    discoverCollections: {
      href: `${prefix}/v1/collections?discoverable=true`,
    },
    promotedCollections: {
      href: `${prefix}/v1/collections?promoted=true`,
    },
    mySavedCollections: {
      href: `${prefix}/v1/collections?projection=list&page=0&size=30&owner=me&bookmarked=true&sort_by=TITLE`,
    },
    myCollections: {
      href: `${prefix}/v1/collections?projection=list&owner=me`,
    },
    createCollection: {
      href: `${prefix}/v1/collections`,
    },
    profile: {
      href: `${prefix}/v1/users/my-user-id`,
    },
    subjects: {
      href: `${prefix}/v1/subjects`,
    },
    countries: {
      href: `${prefix}/v1/countries`,
    },
    tags: {
      href: `${prefix}/v1/tags`,
    },
    disciplines: {
      href: `${prefix}/v1/disciplines`,
    },
  },
};

export const video177Slim = Object.freeze({
  id: '177',
  _links: {
    self: { href: `${prefix}/v1/videos/177` },
    tag: { href: `${prefix}/v1/videos/177/tag` },
    rate: {
      href: `${prefix}/v1/videos/177?rating={rating}`,
      templated: true,
    },
    logInteraction: {
      href: `${prefix}/v1/videos/177/events?createVideoInteractedWith=true&type={type}`,
    },
  },
});

export const video177 = Object.freeze({
  ...video177Slim,
  title: 'KS3/4 Science: Demonstrating Chemistry',
  description: 'Matthew Tosh shows us the science.',
  additionalDescription: 'additional video description',
  releasedOn: '2018-02-11T10:12:33Z',
  createdBy: 'cp1',
  subjects: [
    { id: 'maths-subject-id', name: 'Maths', links: {} },
    { id: 'physics-subject-id', name: 'Physics', links: {} },
  ],
  ageRange: {
    min: 4,
    max: 5,
  },
  rating: 3,
  yourRating: 5,
  playback: {
    type: 'STREAM',
    duration: 'PT1M2S',
    _links: {
      hlsStream: {
        href: 'https://cdn.kaltura.com/stream/147.mpd',
      },
      thumbnail: {
        href: 'https://cdn.kaltura.com/stream/147.mpd',
        templated: false,
      },
    },
  },
  badges: ['ad-free'],
  bestFor: [{ label: 'Hook' }],
  promoted: true,
  type: {
    name: 'educational',
    id: 1,
  },
  attachments: [
    {
      id: 'attachment-id-123',
      type: 'LESSON_PLAN',
      description: 'Lesson plan description',
      _links: {
        download: {
          href: 'www.boclips.com',
          templated: false,
        },
      },
    },
  ],
});

export const videoWithTemplatedThumbnail = Object.freeze({
  ...video177Slim,
  title: 'KS3/4 Science: Demonstrating Chemistry',
  description: 'Matthew Tosh shows us the science.',
  releasedOn: '2018-02-11T10:12:33Z',
  createdBy: 'cp1',
  subjects: [
    { id: 'maths-subject-id', name: 'Maths', links: {} },
    { id: 'physics-subject-id', name: 'Physics', links: {} },
  ],
  rating: 3,
  yourRating: 5,
  playback: {
    type: 'STREAM',
    duration: 'PT1M2S',
    _links: {
      hlsStream: {
        href: 'https://cdn.kaltura.com/stream/147.mpd',
      },
      thumbnail: {
        href:
          'https://cdnapisec.kaltura.com/p/1776261/thumbnail/entry_id/0_yk29dggt/width/{thumbnailWidth}/vid_slices/3/vid_slice/1',
        templated: true,
      },
    },
  },
  badges: ['ad-free'],
  bestFor: [{ label: 'Hook' }],
  promoted: true,
  type: {
    name: 'educational',
    id: 1,
  },
});

export const videoWithoutTemplatedThumbnail = Object.freeze({
  ...video177Slim,
  title: 'KS3/4 Science: Demonstrating Chemistry',
  description: 'Matthew Tosh shows us the science.',
  releasedOn: '2018-02-11T10:12:33Z',
  createdBy: 'cp1',
  subjects: [
    { id: 'maths-subject-id', name: 'Maths', links: {} },
    { id: 'physics-subject-id', name: 'Physics', links: {} },
  ],
  rating: 3,
  yourRating: 5,
  playback: {
    type: 'STREAM',
    duration: 'PT1M2S',
    _links: {
      hlsStream: {
        href: 'https://cdn.kaltura.com/stream/147.mpd',
      },
      thumbnail: {
        href:
          'https://cdnapisec.kaltura.com/p/1776261/thumbnail/entry_id/0_yk29dggt/width/1200/vid_slices/3/vid_slice/1',
        templated: false,
      },
    },
  },
  badges: ['ad-free'],
  bestFor: [{ label: 'Hook' }],
  promoted: true,
  type: {
    name: 'educational',
    id: 1,
  },
});

const video147 = Object.freeze({
  id: '147',
  title: 'KS3/4 Science: Big Screen Science',
  description: 'The winners of the North West round.',
  releasedOn: '2018-02-12T10:12:33Z',
  createdBy: 'cp2',
  subjects: [
    { id: 'maths-subject-id', name: 'Maths' },
    { id: 'physics-subject-id', name: 'Physics' },
  ],
  playback: {
    type: 'STREAM',
    duration: 'PT1M3S',
    _links: {
      hlsStream: {
        href: 'https://cdn.kaltura.com/stream/147.mpd',
      },
      thumbnail: {
        href: 'https://cdn.kaltura.com/stream/147.mpd',
        templated: false,
      },
    },
  },
  badges: ['ad-free'],
  type: {
    name: 'educational',
    id: 1,
  },
  _links: { self: { href: 'http://localhost/v1/videos/147' } },
});

export const youtubeVideo1 = {
  id: '1',
  title: 'A youtube video',
  description: 'Matthew Tosh shows us the science.',
  releasedOn: '2018-02-11T10:12:33Z',
  createdBy: 'cp1',
  subjects: [],
  playback: {
    type: 'YOUTUBE',
    id: 'youtubeId',
    duration: 'PT1M2S',
    _links: {
      thumbnail: {
        href: 'https://cdn.kaltura.com/thumbs/177.jpg',
      },
    },
  },
  badges: ['youtube'],
  type: {
    name: 'educational',
    id: 1,
  },
  _links: { self: { href: 'http://localhost/v1/videos/177' } },
};

export const sampleAttachmentResponse = {
  id: 'attachment-id-1',
  type: 'LESSON_PLAN',
  description: 'Attachment Description',
  _links: { download: { href: 'https://example.com/download' } },
};

export const videosSearchResponse = buildVideoSearchResponse(
  [video177, video147],
  undefined,
);

export const videosSearchResponseWithFacets = buildVideoSearchResponse(
  [video177, video147],
  {
    ageRanges: {
      '3-5': {
        hits: 3,
      },
    },
    subjects: {
      'art-id': {
        hits: 10,
      },
      'other-id': {
        hits: 12,
      },
    },
    durations: {
      'PT10M-PT20M': {
        hits: 3,
      },
    },
    resourceTypes: {
      ACTIVITY: { hits: 1 },
    },
  },
);

export function collectionResponse(
  videosWithin: any[] = [video177Slim],
  id: string = 'id',
  editable: boolean = true,
  title: string = 'funky collection',
) {
  return {
    id,
    owner: 'teacher@gmail.com',
    title,
    videos: videosWithin,
    updatedAt: '2019-01-16T12:00:00.870Z',
    discoverable: true,
    promoted: false,
    subjects: [],
    createdBy: 'AI',
    subCollections: [],
    ageRange: {
      max: 9,
      min: 3,
    },
    _links: {
      self: {
        href: `${prefix}/v1/collections/${id}`,
        templated: false,
      },
      interactedWith: {
        href: `${prefix}/v1/collections/${id}/events`,
        templated: false,
      },
      edit: editable
        ? {
            href: `${prefix}/v1/collections/${id}`,
            templated: false,
          }
        : undefined,
      remove: editable
        ? {
            href: `${prefix}/v1/collections/${id}`,
            templated: false,
          }
        : undefined,
      addVideo: editable
        ? {
            href: `${prefix}/v1/collections/${id}/videos/{video_id}`,
            templated: true,
          }
        : undefined,
      removeVideo: editable
        ? {
            href: `${prefix}/v1/collections/${id}/videos/{video_id}`,
            templated: true,
          }
        : undefined,
    },
  };
}

export function parentCollectionResponse(
  id: string = 'id',
  editable: boolean = true,
  collectionsWithin: any[] = [collectionResponse()],
) {
  return {
    id,
    owner: 'teacher@gmail.com',
    title: 'parent collection',
    videos: [],
    updatedAt: '2019-01-16T12:00:00.870Z',
    discoverable: true,
    promoted: false,
    subjects: [],
    createdBy: 'AI',
    subCollections: collectionsWithin,
    ageRange: {
      max: 9,
      min: 3,
    },
    _links: {
      self: {
        href: `${prefix}/v1/collections/${id}`,
        templated: false,
      },
      interactedWith: {
        href: `${prefix}/v1/collections/${id}/events`,
        templated: false,
      },
      edit: editable
        ? {
            href: `${prefix}/v1/collections/${id}`,
            templated: false,
          }
        : undefined,
      remove: editable
        ? {
            href: `${prefix}/v1/collections/${id}`,
            templated: false,
          }
        : undefined,
      addVideo: editable
        ? {
            href: `${prefix}/v1/collections/${id}/videos/{video_id}`,
            templated: true,
          }
        : undefined,
      removeVideo: editable
        ? {
            href: `${prefix}/v1/collections/${id}/videos/{video_id}`,
            templated: true,
          }
        : undefined,
    },
  };
}

export function collectionResponseAsPromoted(
  videosWithin: any[] = [video177Slim],
  id: string = 'id',
  editable: boolean = true,
) {
  return {
    ...collectionResponse(videosWithin, id, editable),
    title: 'Promoted collection',
    promoted: true,
  };
}

export function collectionResponseWithSubject(
  videosWithin: any[] = [video177Slim],
  id: string = 'id',
  editble: boolean = true,
) {
  return {
    ...collectionResponse(videosWithin, id, editble),
    subjects: [
      { id: '1', name: null },
      { id: '2', name: null },
    ],
  };
}

export function collectionResponseWithAttachment(
  videosWithin: any[] = [video177Slim],
  id: string = 'id',
  attachments: any[] = [sampleAttachmentResponse],
) {
  return {
    ...collectionResponse(videosWithin, id),
    attachments,
  };
}

export function collectionsResponse(data: any[] = [collectionResponse()]) {
  return {
    _embedded: {
      collections: data,
    },
    _links: {
      self: { href: 'http://localhost/v1/collections/' },
      next: { href: 'http://localhost/v1/collections/next' },
    },
  };
}

export function promotedCollectionsResponse(
  data: any[] = [collectionResponseAsPromoted()],
) {
  return {
    _embedded: {
      collections: data,
    },
    _links: {
      self: { href: 'http://localhost/v1/collections/' },
      next: { href: 'http://localhost/v1/collections/next' },
    },
  };
}

export function countriesResponse() {
  return {
    _embedded: {
      countries: [
        {
          id: 'ES',
          name: 'Spain',
          _links: {
            schools: {
              href: `${prefix}/v1/schools?countryCode=ES{&query,state}`,
              templated: true,
            },
          },
        },
        {
          id: 'PL',
          name: 'Poland',
          _links: {
            schools: {
              href: `${prefix}/v1/schools?countryCode=PL{&query,state}`,
              templated: true,
            },
          },
        },
        {
          id: 'GH',
          name: 'Ghana',
          _links: {
            schools: {
              href: `${prefix}/v1/schools?countryCode=GH{&query,state}`,
              templated: true,
            },
          },
        },
        {
          id: 'USA',
          name: 'United States',
          states: [
            {
              id: 'state-1',
              name: 'state 1',
            },
            {
              id: 'state-2',
              name: 'state 2',
            },
          ],
          _links: {
            schools: {
              href: `${prefix}/v1/schools?countryCode=USA{&query,state}`,
              templated: true,
            },
            states: {
              href: `${prefix}/v1/countries/USA/states`,
            },
          },
        },
      ],
    },
  };
}

export function statesResponse() {
  return {
    _embedded: {
      states: [
        {
          id: 'S1',
          name: 'One state',
        },
        {
          id: 'S2',
          name: 'Another state',
        },
      ],
    },
  };
}

export function schoolsResponse() {
  return {
    _embedded: {
      schools: [
        {
          id: 'S1',
          name: 'One school',
        },
        {
          id: 'S2',
          name: 'Another school',
        },
      ],
    },
  };
}

export function tagsResponse() {
  return {
    _embedded: {
      tags: [
        {
          id: '1',
          label: 'Explainer',
          _links: {
            self: { href: 'http://localhost/v1/tags/1' },
          },
        },
        {
          id: '2',
          label: 'Fake news',
          _links: {
            self: { href: 'http://localhost/v1/tags/2' },
          },
        },
      ],
    },
  };
}

export function disciplinesResponse() {
  return {
    _embedded: {
      disciplines: [
        {
          id: 'arts',
          name: 'Arts',
          code: 'arts',
          subjects: [
            {
              id: 'arts-subject-1',
              name: 'Performing Arts',
              lessonGuide: true,
            },
            {
              id: 'arts-subject-2',
              name: 'Art History',
              lessonGuide: false,
            },
          ],
        },
        {
          id: '2',
          name: 'Barts',
          code: 'barts',
          subjects: [],
        },
      ],
    },
    _links: {
      self: {
        href: 'https://api.boclips.com/v1/disciplines',
      },
    },
  };
}

interface UserOptions {
  id: string;
  features?: { [key in UserFeatureKey]?: boolean };
}

export function userResponse(options?: Partial<UserOptions>) {
  const id = options?.id || 'my-user-id';
  const features = options?.features || {
    USER_DATA_HIDDEN: false,
  };
  return {
    id,
    firstName: 'Bob',
    lastName: 'Someone',
    email: 'bob@someone.com',
    subjects: [{ id: '1' }],
    ages: [1, 2, 3, 4],
    school: {
      id: 'school-id',
      country: { name: 'United States', id: 'USA' },
      state: { name: 'California', id: 'CA' },
      name: 'My school',
    },
    features,
    shareCode: 'BOB1',
    _links: {
      self: { href: 'http://localhost/v1/users/my-user-id' },
    },
  };
}
