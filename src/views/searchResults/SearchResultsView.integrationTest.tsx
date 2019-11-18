import Button from 'antd/lib/button/button';
import {
  collectionsResponse,
  video177,
  videos as videoResults,
} from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import { By } from '../../../test-support/By';
import eventually from '../../../test-support/eventually';
import { SearchPage } from '../../../test-support/page-objects/SearchPage';
import { findElement } from '../../../testSetup';
import { ClosableTag } from '../../components/common/tags/Tag';
import DurationFilterTag from '../../components/searchResults/multiple-results/filters/DurationFilterTag';
import DurationSlider from '../../components/searchResults/multiple-results/filters/DurationSlider';
import { FilterButtonWithMediaBreakPoint as FilterButton } from '../../components/searchResults/multiple-results/filters/FilterButton';

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

test('search shows video results', async () => {
  const query = 'some video';
  new ApiStub()
    .defaultUser()
    .queryVideos({ query, results: videoResults })
    .queryCollections({ query, results: collectionsResponse() })
    .fetchVideo()
    .fetchCollections();

  const searchPage = await SearchPage.load({ q: query });

  expect(searchPage.getVideoResults()).toHaveLength(2);
});

test('search with subjects shows video results', async () => {
  const query = 'some video';
  new ApiStub()
    .defaultUser()
    .queryVideos({
      query,
      subject: ['a-subject', 'another-subject'],
      results: videoResults,
    })
    .queryCollections({ query, results: collectionsResponse() })
    .fetchVideo()
    .fetchCollections();

  const searchPage = await SearchPage.load({
    q: query,
    subject: ['a-subject', 'another-subject'],
  });

  expect(searchPage.getVideoResults()).toHaveLength(2);
});

test('search with age range shows video results', async () => {
  const query = 'some video';
  new ApiStub()
    .defaultUser()
    .queryVideos({
      query,
      results: videoResults,
      age_range_min: 1,
      age_range_max: 6,
    })
    .queryCollections({ query, results: collectionsResponse() })
    .fetchVideo()
    .fetchCollections();

  const searchPage = await SearchPage.load({
    q: query,
    age_range_min: 1,
    age_range_max: 6,
  });

  expect(searchPage.getVideoResults()).toHaveLength(2);
});

test('duration filter labels are updated when applying filters', async () => {
  const query = 'some video';
  new ApiStub()
    .defaultUser()
    .queryVideos({ query, results: videoResults })
    .queryCollections({ query, results: collectionsResponse() })
    .fetchVideo()
    .fetchCollections();

  const searchPage = await SearchPage.load({ q: query });

  searchPage.wrapper
    .find(FilterButton)
    .find(By.dataQa('open-filter-modal'))
    .first()
    .simulate('click');

  searchPage.wrapper.find(FilterButton).update();

  searchPage.wrapper
    .find(FilterButton)
    .find(DurationSlider)
    .props()
    .onChange({ min: 60, max: 240 });

  searchPage.wrapper
    .find(FilterButton)
    .findWhere(n => n.length && n.text() === 'OK')
    .find(Button)
    .simulate('click');

  await eventually(() => {
    searchPage.wrapper.update();

    expect(
      searchPage.wrapper
        .find(DurationFilterTag)
        .find(ClosableTag)
        .props().value,
    ).toEqual('1m-4m');
  });
});

test('shows total count of videos', async () => {
  const query = 'some video';
  new ApiStub()
    .defaultUser()
    .queryVideos({ query, results: videoResults })
    .queryCollections({ query, results: collectionsResponse() })
    .fetchVideo()
    .fetchCollections();

  const searchPage = await SearchPage.load({ q: query });

  expect(searchPage.getCount()).toBe(2);
});

test('redirects when clicking on first title', async () => {
  const query = 'some video';
  new ApiStub()
    .defaultUser()
    .queryVideos({ query, results: videoResults })
    .queryCollections({ query, results: collectionsResponse() })
    .fetchVideo()
    .fetchCollections()
    .fetchVideo({ video: video177 });

  const searchPage = await SearchPage.load({ q: query });
  searchPage.clickOnFirstTitle();
  await searchPage.isOnDetailsPage();
});
