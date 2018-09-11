export const links = {
  _links: {
    search: {
      href: '/v1/videos?query={query}',
      templated: true,
    },
  },
};

export const videos = {
  _embedded: {
    videos: [
      {
        id: '177',
        title: 'KS3/4 Science: Demonstrating Chemistry',
        description: 'Matthew Tosh shows us the science.',
        duration: 'PT1M2S',
        releasedOn: '2018-02-11',
        contentProvider: 'cp1',
      },
      {
        id: '147',
        title: 'KS3/4 Science: Big Screen Science',
        description: 'The winners of the North West round.',
        duration: 'PT1M3S',
        releasedOn: '2018-02-12',
        contentProvider: 'cp2',
      },
    ],
  },
};
