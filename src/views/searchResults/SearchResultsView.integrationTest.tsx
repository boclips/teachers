import { SearchPage } from '../../../test-support/page-objects/SearchPage';

test('search for a video shows results', async () => {
  const searchPage = await SearchPage.load('some video');

  expect(searchPage.getVideoResults()).toHaveLength(2);
  expect(searchPage.getVideoResults()[0]).toEqual({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentProvider: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
  });
});

test('shows total count of videos', async () => {
  const searchPage = await SearchPage.load('some video');

  expect(searchPage.getCount()).toBe(2);
});

test('redirects when clicking on first title', async () => {
  const searchPage = await SearchPage.load('some video');
  searchPage.clickOnFirstTitle();
  await searchPage.isOnDetailsPage();
});
