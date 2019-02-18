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
    userDefaultCollection: {
      href: '/v1/collections/default',
    },
  },
};

export const video177 = Object.freeze({
  id: '177',
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

export function userCollectionResponse(data: any[]) {
  return {
    videos: data,
    _links: {
      addVideo: {
        href: '/v1/collections/default/videos/{video_id}',
        templated: true,
      },
      removeVideo: {
        href: '/v1/collections/default/videos/{video_id}',
        templated: true,
      },
    },
  };
}

export function userCollectionsResponse() {
  return {
    _embedded: {
      collections: [
        {
          owner: 'teacher@gmail.com',
          title: 'funky collection',
          videos: [video177],
          _links: {
            addVideo: {
              href: '/v1/collections/default/videos/{video_id}',
              templated: true,
            },
            removeVideo: {
              href: '/v1/collections/default/videos/{video_id}',
              templated: true,
            },
          },
        },
      ],
    },
    _links: { self: { href: 'http://localhost/v1/collections/' } },
  };
}
