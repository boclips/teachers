import { createMemoryHistory } from 'history';
import React from 'react';
import { fakeVideoSetup } from 'test-support/fakeApiClientSetup';
import { fireEvent } from '@testing-library/react';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { Store } from 'redux';
import { waitFor } from '@testing-library/dom';
import {
  collectionResponse,
  parentCollectionResponse,
  video177,
  video177Slim,
} from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import eventually from '../../../test-support/eventually';
import CollectionPage from '../../../test-support/page-objects/CollectionPage';
import { createBoclipsStore } from '../../app/redux/store';
import {
  LinksStateValueFactory,
  MockStoreFactory,
  UserProfileFactory,
  VideoCollectionFactory,
} from '../../../test-support/factories';
import {
  renderWithCreatedStore,
  ResultingContext,
} from '../../../test-support/renderWithStore';
import { axiosMock } from '../../../test-support/MockFetchVerify';
import { CollectionDetailsView } from './CollectionDetailsView';

describe('CollectionDetailsView', () => {
  describe('when video collection', () => {
    test('displays collection basic details', async () => {
      new ApiStub()
        .defaultUser()
        .fetchCollections()
        .fetchCollection(collectionResponse([], 'test-collection-id'));

      await fakeVideoSetup(video177);

      const collectionPage = await CollectionPage.load('test-collection-id');

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
        subjects: ['Maths'],
        playerVideoId: '177',
      });
    });

    test('adds the referer id to the url', async () => {
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

  describe('sharing', () => {
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
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;

      expect(
        await wrapper.queryByText('View collection'),
      ).not.toBeInTheDocument();

      expect(client.events.getEvents()).not.toContainEqual({
        anonymous: true,
        subtype: 'SHARE_CODE_MODAL_IMPRESSION',
        type: 'PLATFORM_INTERACTED_WITH',
      });
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
        await wrapper.queryByText('View collection'),
      ).not.toBeInTheDocument();
    });

    it('stores share code when correct', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.shareCodes.clear();
      client.shareCodes.insertValidShareCode('test-id', 'valid');
      client.users.insertActiveUserId('test-id');

      const history = createMemoryHistory({
        initialEntries: ['/collections/new-collection?referer=test-id'],
      });

      const store: Store = createBoclipsStore(
        MockStoreFactory.sampleState({
          router: { location: { search: '?referer=test-id' } } as any,
          authentication: {
            status: 'anonymous',
          },
          user: null,
        }),
        history,
      );

      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="new-collection" />,
        store,
        history,
      );

      expect(await wrapper.findByText('View collection')).toBeInTheDocument();

      const button = wrapper.getByText('View collection').closest('button');
      const shareField = wrapper.getByPlaceholderText('Enter code');
      expect(button).toBeInTheDocument();
      expect(shareField).toBeInTheDocument();

      await fireEvent.change(shareField, { target: { value: 'valid' } });
      await fireEvent.click(button);

      await waitFor(() =>
        expect(
          wrapper.queryByText('Enter code to view collection'),
        ).not.toBeInTheDocument(),
      );

      expect(store.getState().authentication.refererId).toEqual('test-id');
      expect(store.getState().authentication.shareCode).toEqual('valid');
    });

    it('sends PLATFORM_INTERACTED_WITH SHARE_CODE_MODAL events when interacting with share code modal', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.shareCodes.clear();
      client.shareCodes.insertValidShareCode('test-id', 'valid');
      client.users.insertActiveUserId('test-id');

      const history = createMemoryHistory({
        initialEntries: ['/collections/new-collection?referer=test-id'],
      });

      const store: Store = createBoclipsStore(
        MockStoreFactory.sampleState({
          router: { location: { search: '?referer=test-id' } } as any,
          authentication: {
            status: 'anonymous',
          },
          user: null,
        }),
        history,
      );
      client.events.clear();

      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="new-collection" />,
        store,
        history,
      );

      expect(await wrapper.findByText('View collection')).toBeInTheDocument();

      const button = wrapper.getByText('View collection').closest('button');
      const shareField = wrapper.getByPlaceholderText('Enter code');
      expect(button).toBeInTheDocument();
      expect(shareField).toBeInTheDocument();

      expect(client.events.getEvents()).toEqual([
        {
          anonymous: true,
          subtype: 'SHARE_CODE_MODAL_IMPRESSION',
          type: 'PLATFORM_INTERACTED_WITH',
        },
      ]);

      client.events.clear();
      await fireEvent.change(shareField, { target: { value: 'invalid' } });
      await fireEvent.click(button);

      await eventually(() => {
        expect(client.events.getEvents()).toEqual([
          {
            anonymous: true,
            subtype: 'SHARE_CODE_MODAL_INVALID',
            type: 'PLATFORM_INTERACTED_WITH',
          },
        ]);
      });

      client.events.clear();
      await fireEvent.change(shareField, { target: { value: 'valid' } });
      await fireEvent.click(button);

      await eventually(() => {
        expect(client.events.getEvents()).toEqual([
          {
            anonymous: true,
            subtype: 'SHARE_CODE_MODAL_VALID',
            type: 'PLATFORM_INTERACTED_WITH',
          },
        ]);
      });
    });
  });

  describe('when collection of collections', () => {
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

    it('Displays each collection card of sub collections', async () => {
      expect(collectionPage.getParentCollectionDetails()).toMatchObject({
        title: 'parent collection',
        subjects: [],
        ageRange: '3-9',
      });

      expect(collectionPage.getSubCollections()).toHaveLength(2);
    });

    it('Displays collection titles of sub collections in cards and units', async () => {
      expect(collectionPage.getSubCollections()).toHaveLength(2);
      expect(collectionPage.getSubCollections()[0].title).toEqual(
        'Child collection 1',
      );
      expect(collectionPage.getSubCollections()[1].title).toEqual(
        'Child collection 2',
      );

      expect(collectionPage.getCollectionUnits()).toContain(
        'Child collection 1',
      );
      expect(collectionPage.getCollectionUnits()).toContain(
        'Child collection 2',
      );
    });
  });

  describe(`collection not found page`, () => {
    const renderCollectionDetailsWithAuthState = async (
      authenticationState,
      referer = 'anonymous',
    ) => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.users.clear();
      if (referer !== 'anonymous') {
        client.users.insertActiveUserId(referer);
      }

      const history = createMemoryHistory({
        initialEntries: [`/collections/none-collection?referer=${referer}`],
      });

      return renderWithCreatedStore(
        <CollectionDetailsView collectionId="none-collection" />,
        createBoclipsStore(
          MockStoreFactory.sampleState({
            authentication: authenticationState,
            user: null,
          }),
          history,
        ),
        history,
      );
    };

    const validateCollectionNotFoundPage = async (
      wrapper: ResultingContext,
    ) => {
      expect(
        await wrapper.findByText(
          'The collection you tried to access is not available.',
        ),
      ).toBeInTheDocument();
      expect(
        await wrapper.queryByTestId('collection-skeleton'),
      ).not.toBeInTheDocument();
    };

    it('Shows not found illustration when not found and no share code possible', async () => {
      const wrapper = await renderCollectionDetailsWithAuthState({
        status: 'anonymous',
      });

      await validateCollectionNotFoundPage(wrapper);
    });

    it('Shows not found illustration when authenticated and collection not found', async () => {
      const wrapper = await renderCollectionDetailsWithAuthState(
        {
          status: 'authenticated',
        },
        'user-123',
      );

      await validateCollectionNotFoundPage(wrapper);
    });

    it('Shows not found illustration with valid shared code but collection not found', async () => {
      const wrapper = await renderCollectionDetailsWithAuthState(
        {
          status: 'anonymous',
          refererId: 'user-123',
          shareCode: 'ABCD',
        },
        'user-123',
      );

      await validateCollectionNotFoundPage(wrapper);
    });
  });

  describe(`check whether referer is active`, () => {
    it('shows user inactive popup when referer not active', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.events.clear();

      const history = createMemoryHistory({
        initialEntries: ['/collections/new-collection?referer=inactive-id'],
      });

      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="new-collection" />,
        createBoclipsStore(
          MockStoreFactory.sampleState({
            links: LinksStateValueFactory.sample(
              {},
              'https://api.example.com/v1',
            ),
            router: { location: { search: '?referer=inactive-id' } } as any,
            authentication: { status: 'anonymous' },
            user: null,
          }),
          history,
        ),
        history,
      );

      expect(
        await wrapper.findByText(
          'This collection needs an up to date code to be watched, please get in touch with your teacher.',
        ),
      ).toBeInTheDocument();

      await eventually(() => {
        expect(client.events.getEvents()).toContainEqual({
          anonymous: true,
          subtype: 'REFERER_INACTIVE',
          type: 'PLATFORM_INTERACTED_WITH',
        });
      });
    });

    it('doesnt show user inactive popup when active user', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.users.insertActiveUserId('active-id');
      client.events.clear();

      const history = createMemoryHistory({
        initialEntries: ['/collections/new-collection?referer=active-id'],
      });

      const wrapper = renderWithCreatedStore(
        <CollectionDetailsView collectionId="new-collection" />,
        createBoclipsStore(
          MockStoreFactory.sampleState({
            links: LinksStateValueFactory.sample(
              {},
              'https://api.example.com/v1',
            ),
            router: { location: { search: '?referer=active-id' } } as any,
            authentication: { status: 'anonymous' },
            user: null,
          }),
          history,
        ),
        history,
      );

      expect(await wrapper.queryByText('View collection')).toBeInTheDocument();
      expect(
        wrapper.queryByText(
          'This collection needs an up to date code to be watched, please get in touch with your teacher.',
        ),
      ).not.toBeInTheDocument();

      await eventually(() => {
        expect(client.events.getEvents()).not.toContainEqual({
          anonymous: true,
          subtype: 'REFERER_INACTIVE',
          type: 'PLATFORM_INTERACTED_WITH',
        });
      });
    });
  });
});
