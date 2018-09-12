import moment = require('moment');
import { Link } from '../links/Link';
import { LinksFactory } from '../test-support/factories';
import MockFetchVerify from '../test-support/MockFetchVerify';
import { links, videos } from '../video-service-responses';
import searchVideos from './searchVideos';

test('search Videos', async () => {
  MockFetchVerify.get('/v1/videos?query=hong kong', JSON.stringify(videos));

  const result = await searchVideos(
    'hong kong',
    LinksFactory.sample({
      videos: new Link(links._links.search),
    }),
  );

  expect(result).toEqual([
    {
      title: 'KS3/4 Science: Demonstrating Chemistry',
      description: 'Matthew Tosh shows us the science.',
      duration: moment.duration({ seconds: 2, minutes: 1 }),
      releasedOn: new Date('2018-02-11'),
      contentProvider: 'cp1',
    },
    {
      title: 'KS3/4 Science: Big Screen Science',
      description: 'The winners of the North West round.',
      duration: moment.duration({ seconds: 3, minutes: 1 }),
      releasedOn: new Date('2018-02-12'),
      contentProvider: 'cp2',
    },
  ]);
});
