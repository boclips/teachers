import { createMemoryHistory } from 'history';
import React from 'react';
import { fakeVideoSetup } from 'test-support/fakeApiClientSetup';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { Store } from 'redux';
import {
  collectionResponse,
  parentCollectionResponse,
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
        .fetchCollection(collectionResponse([], 'id'));

      await fakeVideoSetup(video177);

      const collectionPage = await CollectionPage.load();

      expect(collectionPage.getCollectionDetails()).toMatchObject({
        title: 'funky collection',
        subjects: [],
        lastUpdated: 'Jan 16, 2019',
        ageRange: '3-9',
      });
    });

    test('displays video collection with videos', async () => {
      await new ApiStub()
        .defaultUser()
        .fetchCollections()
        .fetchCollection(collectionResponse([video177], 'id'));

      await fakeVideoSetup(video177);

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
      new ApiStub().defaultUser().fetchCollections().fetchCollection();

      axiosMock.onGet('/collections/slow-loading-collection').reply(
        () =>
          new Promise((resolve) => {
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
  });

  describe('when editable collection', () => {
    test('can remove a video', async () => {
      new ApiStub()
        .defaultUser()
        .fetchCollections()
        .fetchCollection(collectionResponse([video177Slim], '789'))
        .removeFromCollection();

      await fakeVideoSetup(video177);

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
        );

      await fakeVideoSetup(video177);
      const collectionPage = await CollectionPage.load('non-editable');

      return eventually(() => {
        expect(collectionPage.getVideos()).toHaveLength(1);
        expect(collectionPage.isEditable()).toBeFalsy();
      });
    });
  });

  describe(`sharing`, () => {
    it('does not show share code dialog if logged in', async () => {
      const history = createMemoryHistory({
        initialEntries: ['/collections/new-collection?referer=test-id'],
      });

      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="new-collection" />,
        createBoclipsStore(
          MockStoreFactory.sampleState({
            router: { location: { search: '?referer=user1123' } } as any,
            authentication: { status: 'authenticated' },
          }),
          history,
        ),
        history,
      );

      expect(
        await wrapper.findByTestId('collection-skeleton'),
      ).toBeInTheDocument();
      expect(
        await wrapper.queryByText('View collection'),
      ).not.toBeInTheDocument();
    });

    it('does not show share code dialog if code already provided', async () => {
      const history = createMemoryHistory({
        initialEntries: ['/collections/new-collection?referer=test-id'],
      });

      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="new-collection" />,
        createBoclipsStore(
          MockStoreFactory.sampleState({
            router: { location: { search: '?referer=test-id' } } as any,
            authentication: {
              status: 'anonymous',
              refererId: 'test-id',
              shareCode: 'ABCD',
            },
          }),
          history,
        ),
        history,
      );

      expect(
        await wrapper.findByTestId('collection-skeleton'),
      ).toBeInTheDocument();
      expect(
        await wrapper.queryByText('View collection'),
      ).not.toBeInTheDocument();
    });

    it('stores share code when correct', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.shareCodes.clear();
      client.shareCodes.insertValidShareCode('test-id', 'valid');

      const history = createMemoryHistory({
        initialEntries: ['/collections/new-collection?referer=test-id'],
      });

      const store: Store = createBoclipsStore(
        MockStoreFactory.sampleState({
          router: { location: { search: '?referer=test-id' } } as any,
          authentication: {
            status: 'anonymous',
          },
        }),
        history,
      );

      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="new-collection" />,
        store,
        history,
      );

      expect(await wrapper.queryByText('View collection')).toBeInTheDocument();

      const button = wrapper.getByText('View collection').closest('button');
      const shareField = wrapper.getByPlaceholderText('Enter code');
      expect(button).toBeInTheDocument();
      expect(shareField).toBeInTheDocument();

      await fireEvent.change(shareField, { target: { value: 'valid' } });
      await fireEvent.click(button);

      await expect(
        waitForElementToBeRemoved(() =>
          wrapper.getByText('Enter code to view collection'),
        ),
      ).resolves.toEqual(true);

      expect(store.getState().authentication.refererId).toEqual('test-id');
      expect(store.getState().authentication.shareCode).toEqual('valid');
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
});

describe(`when collection of collections`, () => {
  let collectionPage;
  beforeEach(async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchCollection(
        parentCollectionResponse('parent-id', false, [
          collectionResponse(
            [video177Slim],
            'child-1',
            false,
            'Child collection 1',
          ),
          collectionResponse(
            [video177Slim],
            'child-2',
            false,
            'Child collection 2',
          ),
        ]),
      );

    await fakeVideoSetup(video177);

    collectionPage = await CollectionPage.load('parent-id');
  });

  it(`Displays each collection card of sub collections`, async () => {
    expect(collectionPage.getParentCollectionDetails()).toMatchObject({
      title: 'parent collection',
      subjects: [],
      ageRange: '3-9',
    });

    expect(collectionPage.getSubCollections()).toHaveLength(2);
  });

  it(`Displays collection titles of sub collections in cards and units`, async () => {
    expect(collectionPage.getSubCollections()).toHaveLength(2);
    expect(collectionPage.getSubCollections()[0].title).toEqual(
      'Child collection 1',
    );
    expect(collectionPage.getSubCollections()[1].title).toEqual(
      'Child collection 2',
    );

    expect(collectionPage.getCollectionUnits()).toContain('Child collection 1');
    expect(collectionPage.getCollectionUnits()).toContain('Child collection 2');
  });
});
