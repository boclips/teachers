import Button from 'antd/lib/button/button';
import ApiStub from '../../../test-support/ApiStub';
import { By } from '../../../test-support/By';
import { SearchPage } from '../../../test-support/page-objects/SearchPage';
import {
  userCollectionsResponse,
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
  new ApiStub().queryVideos({ query, results }).fetchCollections();

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
    .fetchCollections();

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
  new ApiStub().queryVideos({ query, results }).fetchCollections();

  const searchPage = await SearchPage.load(query);
  const newsBox = searchPage.wrapper.find(By.dataQa('news-side-panel'));

  expect(newsBox.text()).toContain(query);

  const button = newsBox.find(Button);
  expect(button).toExist();
  expect(button.text()).toContain('View News');
});

test('shows total count of videos', async () => {
  const query = 'some video';
  new ApiStub().queryVideos({ query, results }).fetchCollections();

  const searchPage = await SearchPage.load(query);

  expect(searchPage.getCount()).toBe(2);
});

test('redirects when clicking on first title', async () => {
  const query = 'some video';
  new ApiStub()
    .queryVideos({ query, results })
    .fetchCollections()
    .fetchVideo({ video: video177 });

  const searchPage = await SearchPage.load(query);
  searchPage.clickOnFirstTitle();
  await searchPage.isOnDetailsPage();
});

test('removing a video from a collection', async () => {
  const query = 'some video';
  new ApiStub()
    .queryVideos({ query, results: videosResponse([video177]) })
    .fetchCollections()
    .removeFromCollection();

  const searchPage = await SearchPage.load(query);

  const collectionMenuButton = searchPage.wrapper
    .find(By.dataQa('video-collection-menu'))
    .first();

  collectionMenuButton.simulate('click');

  const removeFromCollection = await waitForElement(
    "[data-qa='remove-from-collection']",
  );

  expect(removeFromCollection.checked).toBeTruthy();
  removeFromCollection.click();
});

test('adding a video to a collection', async () => {
  const query = 'some video';
  new ApiStub()
    .queryVideos({ query, results: videosResponse([video177]) })
    .fetchCollections(userCollectionsResponse([]))
    .addToCollection();

  const searchPage = await SearchPage.load(query);

  const collectionMenuButton = searchPage.wrapper
    .find(By.dataQa('video-collection-menu'))
    .first();

  expect(collectionMenuButton).toHaveText('Save');

  collectionMenuButton.simulate('click');

  const addToCollection = await waitForElement("[data-qa='add-to-collection']");

  expect(addToCollection.checked).toBeFalsy();
  addToCollection.click();
});
