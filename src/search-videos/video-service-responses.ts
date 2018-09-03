export const links = {
  _links: {
    videos: {
      href: '/videos?query={query}',
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
        description: 'Matthew Tosh shows us the science behind firework displays ' +
          'which can\'t be performed in the classroom. ',
      },
      {
        id: '147',
        title: 'KS3/4 Science: Big Screen Science',
        description: 'The winners of the North West round of the Big Screen Science competition ' +
          'convey the complex subject of xenotransplantation through their animated film.',
      },
    ],
  },
};
