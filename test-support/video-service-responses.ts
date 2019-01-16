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
  },
};

export const video177 = Object.freeze({
  id: '177',
  title: 'KS3/4 Science: Demonstrating Chemistry',
  description: 'Matthew Tosh shows us the science.',
  releasedOn: '2018-02-11',
  contentPartner: 'cp1',
  subjects: ['Maths', 'Physics'],
  playback: {
    type: 'STREAM',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    streamUrl: 'https://cdn.kaltura.com/stream/147.mpd',
    duration: 'PT1M2S',
  },
});

const video147 = Object.freeze({
  id: '147',
  title: 'KS3/4 Science: Big Screen Science',
  description: 'The winners of the North West round.',
  releasedOn: '2018-02-12',
  contentPartner: 'cp2',
  subjects: [],
  playback: {
    type: 'STREAM',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/147.jpg',
    streamUrl: 'https://cdn.kaltura.com/stream/147.mpd',
    duration: 'PT1M3S',
  },
});

export const videos = {
  _embedded: {
    videos: [video177, video147],
  },
  page: {
    size: 10,
    totalElements: 2,
    totalPages: 1,
    number: 0,
  },
};

export const youtubeVideo1 = {
  id: '1',
  title: 'A youtube video',
  description: 'Matthew Tosh shows us the science.',
  releasedOn: '2018-02-11',
  contentPartner: 'cp1',
  subjects: [],
  playback: {
    type: 'YOUTUBE',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    id: 'youtubeId',
    duration: 'PT1M2S',
  },
};
