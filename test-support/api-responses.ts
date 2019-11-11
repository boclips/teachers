const prefix = 'https://api.example.com';

export const links = {
  _links: {
    searchVideos: {
      href: `${prefix}/v1/videos{?query,sort_by,include_tag,exclude_tag,duration_min,duration_max,released_date_from,released_date_to,source,age_range_min,age_range_max,size,page,subject,promoted}`,
      templated: true,
    },
    searchPublicCollections: {
      href: `${prefix}/v1/collections{?query,subject}`,
      templated: true,
    },
    video: {
      href: `${prefix}/v1/videos/{id}`,
      templated: true,
    },
    createPlaybackEvent: {
      href: `${prefix}/v1/events`,
    },
    collection: {
      href: `${prefix}/v1/collections/{id}`,
      templated: true,
    },
    publicCollections: {
      href: `${prefix}/v1/collections?public=true`,
    },
    bookmarkedCollections: {
      href: `${prefix}/v1/collections?bookmarked=true`,
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
  releasedOn: '2018-02-11T10:12:33Z',
  createdBy: 'cp1',
  subjects: [
    { id: 'maths-subject-id', name: 'Maths', lessonPlan: false },
    { id: 'physics-subject-id', name: 'Physics', lessonPlan: false },
  ],
  rating: 3,
  yourRating: 5,
  playback: {
    type: 'STREAM',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    streamUrl: 'https://cdn.kaltura.com/stream/147.mpd',
    duration: 'PT1M2S',
  },
  badges: ['ad-free'],
  bestFor: { label: 'Hook' },
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
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/147.jpg',
    streamUrl: 'https://cdn.kaltura.com/stream/147.mpd',
    duration: 'PT1M3S',
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
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    id: 'youtubeId',
    duration: 'PT1M2S',
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

export const videos = videosResponse([video177, video147]);

export function videosResponse(data: any[]) {
  return {
    _embedded: {
      videos: data,
    },
    page: {
      size: 10,
      totalElements: 2,
      totalPages: 1,
      number: 0,
    },
  };
}

export function promotedResponse() {
  return this.videosResponse([video177, video147]);
}

export function collectionResponse(
  videosWithin: any[] = [video177Slim],
  id: string = 'id',
  editable: boolean = true,
) {
  return {
    id,
    owner: 'teacher@gmail.com',
    title: 'funky collection',
    videos: videosWithin,
    updatedAt: '2019-01-16T12:00:00.870Z',
    public: true,
    subjects: [],
    createdBy: 'AI',
    _links: {
      self: {
        href: `${prefix}/v1/collections/${id}`,
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

export function collectionResponseWithSubject(
  videosWithin: any[] = [video177Slim],
  id: string = 'id',
  editble: boolean = true,
) {
  return {
    ...collectionResponse(videosWithin, id, editble),
    subjects: [{ id: '1', name: null }, { id: '2', name: null }],
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

export function collectionsResponse(
  videosWithin: any[] = [video177],
  subjects: Array<{ id: string; name: null }> = [],
) {
  return {
    _embedded: {
      collections: [
        {
          id: 'id',
          owner: 'teacher@gmail.com',
          title: 'funky collection',
          videos: videosWithin,
          updatedAt: '2019-01-16T12:00:00.870Z',
          public: true,
          createdBy: 'AI',
          ageRange: {
            min: 3,
            max: 9,
          },
          description: 'my description',
          subjects,
          _links: {
            edit: {
              href: `${prefix}/v1/collections/id`,
              templated: false,
            },
            remove: {
              href: `${prefix}/v1/collections/id`,
              templated: false,
            },
            addVideo: {
              href: `${prefix}/v1/collections/id/videos/{video_id}`,
              templated: true,
            },
            removeVideo: {
              href: `${prefix}/v1/collections/id/videos/{video_id}`,
              templated: true,
            },
            self: {
              href: `${prefix}/v1/collections/id`,
              templated: false,
            },
          },
        },
      ],
    },
    _links: {
      self: { href: 'http://localhost/v1/collections/' },
      next: { href: 'http://localhost/v1/collections/next' },
    },
  };
}

export function subjectsResponse() {
  return {
    _embedded: {
      subjects: [
        {
          id: '1',
          name: 'Maths',
          lessonPlan: true,
        },
        {
          id: '2',
          name: 'French',
          lessonPlan: true,
        },
        {
          id: '3',
          name: 'German',
          lessonPlan: false,
        },
      ],
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
              lessonPlan: true,
            },
            {
              id: 'arts-subject-2',
              name: 'Art History',
              lessonPlan: false,
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

export function userResponse(id: string = 'my-user-id') {
  return {
    id,
    firstName: 'Bob',
    lastName: 'Someone',
    email: 'bob@someone.com',
    analyticsId: '123',
    subjects: [{ id: '1' }],
    ages: [1, 2, 3, 4],
    organisation: {
      country: { name: 'United States', id: 'USA' },
      state: { name: 'California', id: 'CA' },
      name: 'My school',
    },
    _links: {
      self: { href: `http://localhost/v1/users/my-user-id` },
    },
  };
}
