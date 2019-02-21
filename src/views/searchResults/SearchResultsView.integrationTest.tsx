import Button from 'antd/lib/button/button';
import ApiStub from '../../../test-support/ApiStub';
import { By } from '../../../test-support/By';
import { SearchPage } from '../../../test-support/page-objects/SearchPage';
import {
  userCollectionResponse,
  video177,
  videos as results,
  videosResponse,
} from '../../../test-support/video-service-responses';
import { findElement, waitForElement } from '../../../testSetup';
import { Constants } from '../../app/AppConstants';

beforeEach(() => {
  try {
    const notification = findElement('.ant-notification-notice');

    if (notification) {
      notification.remove();
    }
  } catch (e) {
    // swallow
  }
});
test('search for a video shows results', async () => {
  const query = 'some video';
  new ApiStub().queryVideos({ query, results }).fetchCollection();

  const searchPage = await SearchPage.load(query);

  expect(searchPage.getVideoResults()).toHaveLength(2);
  expect(searchPage.getVideoResults()[0]).toMatchObject({
    title: 'KS3/4 Science: Demonstrating Chemistry',
    description: 'Matthew Tosh shows us the science.',
    contentPartner: 'cp1',
    duration: ' 1m 2s',
    releasedOn: 'Feb 11, 2018',
    thumbnailUrl: 'https://cdn.kaltura.com/thumbs/177.jpg',
    badgeAlt: 'Ad free',
    subjects: ['Maths', 'Physics'],
  });
});

test('shows news-only view with news header', async () => {
  const query = 'some news';
  new ApiStub()
    .queryVideos({ query, results, tag: Constants.NEWS })
    .fetchCollection();

  const searchPage = await SearchPage.loadNews(query);

  expect(searchPage.getVideoResults().length).toBeGreaterThan(0);
  const newsBox = searchPage.wrapper.find(By.dataQa('news-header'));

  expect(newsBox.text()).toContain(query);

  const button = newsBox.find(Button);

  expect(button).toExist();
  expect(button.text()).toContain('Back');
});

test('should render news box', async () => {
  const query = 'some video';
  new ApiStub().queryVideos({ query, results }).fetchCollection();

  const searchPage = await SearchPage.load(query);
  const newsBox = searchPage.wrapper.find(By.dataQa('news-side-panel'));

  expect(newsBox.text()).toContain(query);

  const button = newsBox.find(Button);
  expect(button).toExist();
  expect(button.text()).toContain('View News');
});

test('shows total count of videos', async () => {
  const query = 'some video';
  new ApiStub().queryVideos({ query, results }).fetchCollection();

  const searchPage = await SearchPage.load(query);

  expect(searchPage.getCount()).toBe(2);
});

test('redirects when clicking on first title', async () => {
  const query = 'some video';
  new ApiStub()
    .queryVideos({ query, results })
    .fetchCollection()
    .fetchVideo({ video: video177 });

  const searchPage = await SearchPage.load(query);
  searchPage.clickOnFirstTitle();
  await searchPage.isOnDetailsPage();
});

test('indicates if video is in your default collection', async () => {
  const query = 'some video';
  new ApiStub().queryVideos({ query, results }).fetchCollection();

  const searchPage = await SearchPage.load(query);
  const videos = searchPage.getVideoResults();

  expect(videos).toHaveLength(2);

  expect(videos[0].title).toEqual('KS3/4 Science: Demonstrating Chemistry');
  expect(videos[0].isSaved).toBeTruthy();

  expect(videos[1].title).toEqual('KS3/4 Science: Big Screen Science');
  expect(videos[1].isSaved).toBeFalsy();
});

test('removing a video to default collection', async () => {
  const query = 'some video';
  new ApiStub()
    .queryVideos({ query, results: videosResponse([video177]) })
    .fetchCollection({ collection: userCollectionResponse([video177]) })
    .removeFromCollection();

  const searchPage = await SearchPage.load(query);

  const collectionMenuButton = searchPage.wrapper
    .find(By.dataQa('video-collection-menu'))
    .first();

  expect(collectionMenuButton).toHaveText('Saved');

  collectionMenuButton.simulate('click');

  const removeFromDefaultCollection = await waitForElement(
    "[data-qa='remove-from-collection']",
  );

  expect(removeFromDefaultCollection.checked).toBeTruthy();
  removeFromDefaultCollection.click();

  const notification = await waitForElement(
    '.ant-notification-notice-description',
  );

  expect(notification.textContent).toMatch('Removed from collection');
});
test('adding a video to default collection', async () => {
  const query = 'some video';
  new ApiStub()
    .queryVideos({ query, results: videosResponse([video177]) })
    .fetchCollection({ collection: userCollectionResponse([]) })
    .addToCollection();

  const searchPage = await SearchPage.load(query);

  const collectionMenuButton = searchPage.wrapper
    .find(By.dataQa('video-collection-menu'))
    .first();

  expect(collectionMenuButton).toHaveText('Save');

  collectionMenuButton.simulate('click');

  const addToDefaultCollection = await waitForElement(
    "[data-qa='add-to-default-collection']",
  );

  expect(addToDefaultCollection.checked).toBeFalsy();
  addToDefaultCollection.click();

  const notification = await waitForElement(
    '.ant-notification-notice-description',
  );

  expect(notification.textContent).toMatch('has been saved');
});
