import { createMemoryHistory } from 'history';
import React from 'react';
import {
  collectionResponse,
  video177,
  video177Slim,
} from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import eventually from '../../../test-support/eventually';
import { CollectionPage } from '../../../test-support/page-objects/CollectionPage';
import { createBoclipsStore } from '../../app/redux/store';
import {
  LinksStateValueFactory,
  MockStoreFactory,
  UserProfileFactory,
  VideoCollectionFactory,
} from '../../../test-support/factories';
import { renderWithCreatedStore } from '../../../test-support/renderWithStore';
import { axiosMock } from '../../../test-support/MockFetchVerify';
import { CollectionDetailsView } from './CollectionDetailsView';

describe('CollectionDetailsView', () => {
  describe('when video collection', () => {
    test('displays collection basic details', async () => {
      new ApiStub()
        .defaultUser()
        .fetchCollections()
        .fetchCollection(collectionResponse([], 'id'))
        .fetchVideo();

      const collectionPage = await CollectionPage.load();

      expect(collectionPage.getCollectionDetails()).toMatchObject({
        title: 'funky collection',
        isPublic: true,
        subjects: [],
        lastUpdated: 'Jan 16, 2019',
        ageRange: '3-9',
      });
    });

    test('displays video collection with videos', async () => {
      new ApiStub()
        .defaultUser()
        .fetchCollections()
        .fetchCollection(collectionResponse([video177], 'id'))
        .fetchVideo();

      const collectionPage = await CollectionPage.load();

      expect(collectionPage.isEmptyCollection()).toBeFalsy();
      expect(collectionPage.getVideos()).toHaveLength(1);
      expect(collectionPage.getVideos()[0]).toMatchObject({
        title: 'KS3/4 Science: Demonstrating Chemistry',
        description: 'Matthew Tosh shows us the science.',
        createdBy: 'cp1',
        duration: ' 1m 2s',
        releasedOn: 'Feb 11, 2018',
        subjects: ['Maths', 'Physics'],
        playerVideoId: '177',
      });
    });

    test(`adds the referer id to the url`, async () => {
      const existingHistory = createMemoryHistory({
        initialEntries: ['/collection/123'],
      });

      const collection = VideoCollectionFactory.sample();

      const store = createBoclipsStore(
        {
          ...MockStoreFactory.sampleState({
            links: LinksStateValueFactory.sample(
              {},
              'https://api.example.com/v1',
            ),
          }),
          authentication: {
            status: 'authenticated',
          },
          user: UserProfileFactory.sample({ id: 'user-123' }),
        },
        existingHistory,
      );

      const { history } = renderWithCreatedStore(
        <CollectionDetailsView collectionId={collection.id} />,
        store,
        existingHistory,
      );

      await eventually(() => {
        expect(history.location.search).toContain('referer=user-123');
      });
    });
  });

  describe('when empty collection', () => {
    test('displays beautiful illustration', async () => {
      new ApiStub()
        .defaultUser()
        .fetchCollections()
        .fetchCollection(collectionResponse([], 'empty'));

      const collectionPage = await CollectionPage.load('empty');

      await eventually(() => {
        expect(collectionPage.isEmptyCollection()).toBeTruthy();
      });
    });
  });

  describe('CollectionsDetailsView before collection loaded', () => {
    beforeEach(() => {
      new ApiStub()
        .defaultUser()
        .fetchCollections()
        .fetchCollection();

      axiosMock.onGet('/collections/slow-loading-collection').reply(
        () =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve([200, collectionResponse([], 'slow-loading-collection')]);
            }, 300);
          }),
      );
    });

    it('Shows skeleton while loading', async () => {
      const history = createMemoryHistory({
        initialEntries: [
          '/collections/slow-loading-collection?referer=test-id',
        ],
      });
      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="slow-loading-collection" />,
        createBoclipsStore(MockStoreFactory.sampleState(), history),
        history,
      );

      expect(
        await wrapper.findByTestId('collection-skeleton'),
      ).toBeInTheDocument();
    });

    it('Shows skeleton and prompt for a share code when not loaded and referer set', async () => {
      const history = createMemoryHistory({
        initialEntries: ['/collections/new-collection?referer=test-id'],
      });

      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="new-collection" />,
        createBoclipsStore(
          MockStoreFactory.sampleState({
            router: { location: { search: '?referer=user1123' } } as any,
          }),
          history,
        ),
        history,
      );

      expect(
        await wrapper.findByTestId('collection-skeleton'),
      ).toBeInTheDocument();
      expect(await wrapper.findByText('View collection')).toBeInTheDocument();
    });

    it('Shows not found illustration when not found and no share code possible', async () => {
      const history = createMemoryHistory({
        initialEntries: ['/collections/none-collection'],
      });
      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="none-collection" />,
        createBoclipsStore(MockStoreFactory.sampleState(), history),
        history,
      );

      expect(
        await wrapper.findByText(
          'The collection you tried to access is not available.',
        ),
      ).toBeInTheDocument();
      expect(
        await wrapper.queryByTestId('collection-skeleton'),
      ).not.toBeInTheDocument();
    });
  });

  describe('when editable collection', () => {
    test('can remove a video', async () => {
      new ApiStub()
        .defaultUser()
        .fetchCollections()
        .fetchCollection(collectionResponse([video177Slim], '789'))
        .fetchVideo()
        .removeFromCollection();

      const collectionPage = await CollectionPage.load('789');
      expect(collectionPage.getVideos()).toHaveLength(1);

      collectionPage.removeVideo(0);

      await eventually(() => {
        expect(collectionPage.getVideos()).toHaveLength(0);
      });
    });
  });

  describe('when non editable collection', () => {
    test('does not render edit collection button', async () => {
      new ApiStub()
        .defaultUser()
        .fetchCollections()
        .fetchCollection(
          collectionResponse([video177Slim], 'non-editable', false),
        )
        .fetchVideo();

      const collectionPage = await CollectionPage.load('non-editable');

      return eventually(() => {
        expect(collectionPage.getVideos()).toHaveLength(1);
        expect(collectionPage.isEditable()).toBeFalsy();
      });
    });
  });

  describe(`sharing`, () => {
    test(`prompts for share code when referer set`, async () => {
      const history = createMemoryHistory({
        initialEntries: ['/collections/123?referer=test-123'],
      });
      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId={'123'} />,
        createBoclipsStore(MockStoreFactory.sampleState(), history),
        history,
      );

      expect(
        await wrapper.findByText('Enter code to view collection'),
      ).toBeInTheDocument();
    });

    test(`renders not found when referer not set`, async () => {
      const history = createMemoryHistory({
        initialEntries: ['/collections/123'],
      });
      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId={'123'} />,
        createBoclipsStore(MockStoreFactory.sampleState(), history),
        history,
      );

      expect(await wrapper.findByText('Oops!!')).toBeInTheDocument();
    });
  });
});
