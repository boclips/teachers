import { fireEvent } from '@testing-library/dom';
import React from 'react';
import Button from 'antd/lib/button/button';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { within } from '@testing-library/react';
import {
  collectionResponse,
  collectionsResponse,
  video177,
  videos as videoResults,
} from 'test-support/api-responses';
import ApiStub from 'test-support/ApiStub';
import { By } from 'test-support/By';
import eventually from 'test-support/eventually';
import {
  CollectionSearchFactory,
  EntitiesFactory,
  MockStoreFactory,
  SearchFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
  VideoSearchFactory,
  RouterFactory,
  UserProfileFactory,
  SubjectFactory,
  CollectionsFactory,
  LinksStateValueFactory,
} from 'test-support/factories';
import { SearchPage } from 'test-support/page-objects/SearchPage';
import {
  renderWithCreatedStore,
  renderWithStore,
} from 'test-support/renderWithStore';
import { findElement } from 'src/../testSetup';
import { ClosableTag } from 'src/components/common/tags/Tag';
import { getBoclipsClient } from 'src/services/apiClient';
import { Link } from 'src/types/Link';
import { createBoclipsStore } from 'src/app/redux/store';
import { FilterButtonWithMediaBreakPoint as FilterButton } from '../../components/searchResults/old/filters/FilterButton';
import DurationSlider from '../../components/searchResults/filters/DurationSlider';
import DurationFilterTag from '../../components/searchResults/filters/DurationFilterTag';
import SearchResultsView from './SearchResultsView';

beforeEach(() => {
  try {
    const notification = findElement('.ant-notification-notice');

    if (notification) {
      notification.remove();
    }
  } catch (e) {
    // Swallow
  }
});

describe('search results', () => {
  test('search shows video results', async () => {
    const query = 'some video';
    new ApiStub()
      .defaultUser()
      .queryVideos({ query, results: videoResults })
      .queryCollections({
        query,
        results: collectionsResponse([collectionResponse()]),
      })
      .fetchVideo()
      .fetchCollections();

    const searchPage = await SearchPage.load({ q: query });

    expect(searchPage.getVideoResults()).toHaveLength(2);
  });

  test('search shows video and collection results', async () => {
    const query = 'some video';
    new ApiStub()
      .defaultUser()
      .queryVideos({ query, results: videoResults })
      .queryCollections({
        query,
        results: collectionsResponse(),
      })
      .fetchVideo()
      .fetchCollections();

    const searchPage = await SearchPage.load({ q: query });

    expect(searchPage.getVideoResults()).toHaveLength(2);
    expect(searchPage.getCollectionResults()).toHaveLength(1);
  });

  test('search limits collection results to 5', async () => {
    const query = 'some video';
    new ApiStub()
      .defaultUser()
      .queryVideos({ query, results: videoResults })
      .queryCollections({
        query,
        results: collectionsResponse([
          collectionResponse(),
          collectionResponse(),
          collectionResponse(),
          collectionResponse(),
          collectionResponse(),
          collectionResponse(),
          collectionResponse(),
        ]),
      })
      .fetchVideo()
      .fetchCollections();

    const searchPage = await SearchPage.load({ q: query });

    expect(searchPage.getCollectionResults()).toHaveLength(5);
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

  test('persists filters across different searches', async () => {
    const store = createBoclipsStore(
      MockStoreFactory.sampleState({
        search: {
          videoSearch: VideoSearchFactory.sample({
            videoIds: ['video-id-one', 'video-id-two'],
            paging: {
              number: 1,
              size: 10,
              totalElements: 2,
              totalPages: 1,
            },
          }),
          collectionSearch: CollectionSearchFactory.sample(),
        },
        user: UserProfileFactory.sample(),
        subjects: [
          SubjectFactory.sample({ id: 'subject-one-id', name: 'Mathematics' }),
        ],
        entities: EntitiesFactory.sample({
          videos: {
            byId: {
              'video-id-one': VideoFactory.sample({ id: 'video-id-one' }),
              'video-id-two': VideoFactory.sample({ id: 'video-id-two' }),
            },
          },
        }),
        collections: CollectionsFactory.sample(),
        links: LinksStateValueFactory.sample(),
        router: RouterFactory.sample({
          location: {
            pathname: '',
            search:
              '?q=fractions&age_range_min=11&age_range_max=14&subject=subject-one-id',
            hash: '',
            state: null,
          },
        }),
      }),
    );
    const searchPage = renderWithCreatedStore(<SearchResultsView />, store);
    const searchInput = await searchPage.findByTestId('search-input');

    fireEvent.input(searchInput, {
      target: {
        value: 'percentages',
      },
    });

    fireEvent.click(searchPage.getByText('Search'));

    const filtersBar = await searchPage.findByTestId('filters-bar');
    const ageFilter = within(filtersBar).getByText('11-14');
    const subjectFilter = within(filtersBar).getByText('Mathematics');

    expect(ageFilter).toBeInTheDocument();
    expect(subjectFilter).toBeInTheDocument();
  });

  test('shows total count of videos and collections', async () => {
    const query = 'some video';
    new ApiStub()
      .defaultUser()
      .queryVideos({ query, results: videoResults })
      .queryCollections({ query, results: collectionsResponse() })
      .fetchVideo()
      .fetchCollections();

    const searchPage = await SearchPage.load({ q: query });

    expect(searchPage.getCount()).toBe(3);
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

  test('send event when collection is opened through search results', async () => {
    const client = (await getBoclipsClient()) as FakeBoclipsClient;

    const collection = VideoCollectionFactory.sample({
      id: 'test-id',
      title: 'Test title to click',
      links: VideoCollectionLinksFactory.sample({
        interactedWith: new Link({ href: '/collections/test-id/events' }),
      }),
    });
    const video = VideoFactory.sample({ id: 'video-id' });

    const searchState = SearchFactory.sample({
      videoSearch: VideoSearchFactory.sample({
        videoIds: [video.id],
        paging: {
          number: 0,
          size: 10,
          totalElements: 1,
          totalPages: 1,
        },
      }),
      collectionSearch: CollectionSearchFactory.sample({
        collectionIds: [collection.id],
      }),
    });

    const { getByTestId } = renderWithStore(<SearchResultsView />, {
      initialState: MockStoreFactory.sampleState({
        entities: EntitiesFactory.sample({
          collections: { byId: { [collection.id]: collection } },
          videos: { byId: { [video.id]: video } },
        }),
        search: searchState,
      }),
    });

    client.eventsClient.clear();

    const collectionCard = getByTestId('collection-card');

    await fireEvent.mouseDown(collectionCard);

    expect(client.eventsClient.getEvents().length).toBe(1);
    expect(client.eventsClient.getEvents()[0]).toEqual({
      subtype: 'NAVIGATE_TO_COLLECTION_DETAILS',
    });
  });

  it('renders collections, when there are no video results', () => {
    const { queryByText, queryByTestId } = renderWithStore(
      <SearchResultsView />,
      {
        initialState: {
          search: {
            videoSearch: VideoSearchFactory.sample({ query: 'testing dogs' }),
            collectionSearch: CollectionSearchFactory.sample({
              query: 'testing dogs',
              collectionIds: ['collection-id-one'],
            }),
          },
          entities: {
            collections: {
              byId: {
                'collection-id-one': VideoCollectionFactory.sample({
                  id: 'collection-id-one',
                  title: 'My Collection Title: Testing dogs',
                }),
              },
            },
            videos: {
              byId: {
                'video-id': VideoFactory.sample({
                  id: 'video-id',
                  title: 'The video',
                }),
              },
            },
          },
          router: RouterFactory.sample({
            location: {
              search: 'testing dogs',
            },
          } as any),
        },
      },
    );

    expect(
      queryByText('My Collection Title: Testing dogs'),
    ).toBeInTheDocument();
    expect(queryByText('The video')).not.toBeInTheDocument();
    expect(queryByTestId('pagination')).not.toBeInTheDocument();
  });
});
