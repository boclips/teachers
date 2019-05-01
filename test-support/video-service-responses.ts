export const links = {
  _links: {
    search: {
      href:
        '/v1/videos?query={query}&page={page}&size={size}{&include_tag,exclude_tag}',
      templated: true,
    },
    video: {
      href: '/v1/videos/{id}',
      templated: true,
    },
    createPlaybackEvent: {
      href: '/v1/events',
    },
    collection: {
      href: '/v1/collections/{id}',
      templated: true,
    },
    publicCollections: {
      href: '/v1/collections?public=true',
    },
    bookmarkedCollections: {
      href: '/v1/collections?bookmarked=true',
    },
    myCollections: {
      href: '/v1/collections?projection=list&owner=me',
    },
    collections: {
      href: '/v1/collections',
    },
    profile: {
      href: '/v1/users/{id}',
      templated: true,
    },
    subjects: {
      href: '/v1/subjects',
    },
  },
};

export const video177Slim = Object.freeze({
  id: '177',
  _links: { self: { href: '/v1/videos/177' } },
});

export const video177 = Object.freeze({
  ...video177Slim,
  title: 'KS3/4 Science: Demonstrating Chemistry',
  description: 'Matthew Tosh shows us the science.',
  releasedOn: '2018-02-11T10:12:33Z',
  contentPartner: 'cp1',
  subjects: ['Maths', 'Physics'],
  playback: {
    type: 'STREAM',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    streamUrl: 'https://cdn.kaltura.com/stream/147.mpd',
    duration: 'PT1M2S',
  },
  badges: ['ad-free'],
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
  contentPartner: 'cp2',
  subjects: [],
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
  contentPartner: 'cp1',
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
        href: `/v1/collections/${id}`,
        templated: false,
      },
      edit: editable
        ? {
            href: `/v1/collections/${id}`,
            templated: false,
          }
        : undefined,
      remove: editable
        ? {
            href: `/v1/collections/${id}`,
            templated: false,
          }
        : undefined,
      addVideo: editable
        ? {
            href: `/v1/collections/${id}/videos/{video_id}`,
            templated: true,
          }
        : undefined,
      removeVideo: editable
        ? {
            href: `/v1/collections/${id}/videos/{video_id}`,
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
            label: '3-9',
          },
          subjects,
          _links: {
            edit: {
              href: '/v1/collections/id',
              templated: false,
            },
            remove: {
              href: '/v1/collections/id',
              templated: false,
            },
            addVideo: {
              href: '/v1/collections/id/videos/{video_id}',
              templated: true,
            },
            removeVideo: {
              href: '/v1/collections/id/videos/{video_id}',
              templated: true,
            },
            self: {
              href: '/v1/collections/id',
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
        },
        {
          id: '2',
          name: 'French',
        },
        {
          id: '3',
          name: 'German',
        },
      ],
    },
  };
}

export function userResponse(id: string = 'user-id') {
  return {
    id,
    firstName: 'Bob',
    lastName: 'Someone',
    email: 'bob@someone.com',
    analyticsId: '123',
    _links: { self: { href: 'http://localhost/v1/users/user-id' } },
  };
}
