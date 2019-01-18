import Button from 'antd/lib/button/button';
import { By } from '../../../test-support/By';
import { SearchPage } from '../../../test-support/page-objects/SearchPage';

test('search for a video shows results', async () => {
  const searchPage = await SearchPage.load('some video');

  expect(searchPage.getVideoResults()).toHaveLength(2);
  expect(searchPage.getVideoResults()[0]).toMatchObject({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentProvider: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    badgeAlt: 'Ad free',
  });
});

test('shows news-only view with news header', async () => {
  const searchPage = await SearchPage.loadNews('some news');

  expect(searchPage.getVideoResults().length).toBeGreaterThan(0);
  const newsBox = searchPage.wrapper.find(By.dataQa('news-header'));

  expect(newsBox.text()).toContain('some news');

  const button = newsBox.find(Button);

  expect(button).toExist();
  expect(button.text()).toContain('Back');
});

test('should render news box', async () => {
  const searchPage = await SearchPage.load('some video');
  const newsBox = searchPage.wrapper.find(By.dataQa('news-side-panel'));

  expect(newsBox.text()).toContain('some video');

  const button = newsBox.find(Button);
  expect(button).toExist();
  expect(button.text()).toContain('View News');
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

test('indicates if video is in your default collection', async () => {
  const searchPage = await SearchPage.load('some video');
  const videos = searchPage.getVideoResults();

  expect(videos).toHaveLength(2);

  expect(videos[0].title).toEqual('KS3/4 Science: Demonstrating Chemistry');
  expect(videos[0].isSaved).toBeTruthy();

  expect(videos[1].title).toEqual('KS3/4 Science: Big Screen Science');
  expect(videos[1].isSaved).toBeFalsy();
});

test('can toggle whether a video is in the default collection', async () => {
  const searchPage = await SearchPage.load('some video');
  const firstResult = searchPage.getVideoCard(1);

  const toggleCollectionButton = firstResult
    .find(By.dataQa('default-collection-toggle'))
    .first();

  expect(toggleCollectionButton).toHaveText('Save');

  toggleCollectionButton.simulate('click');
  expect(toggleCollectionButton).toHaveText('Saved');
});
