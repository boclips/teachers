import {
  fireEvent,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import React from 'react';

import {
  CollectionsFactory,
  EntitiesFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
} from '../../../test-support/factories';
import MockFetchVerify from '../../../test-support/MockFetchVerify';
import { renderWithStore } from '../../../test-support/renderWithStore';
import collectionMiddleware from '../../components/collection/redux/middleware/collectionMiddleware';
import { collectionHandlers } from '../../components/collection/redux/reducers/collectionEntitiesReducer';
import { Link } from '../../types/Link';
import { VideoCollection } from '../../types/VideoCollection';
import MyResourcesListView from './MyResourcesListView';

describe('MyResourcesListView', () => {
  it('when user has no bookmarks or collections, it renders a helper message', () => {
    const { getByText } = renderWithStore(<MyResourcesListView />, {
      initialState: {
        entities: EntitiesFactory.sample(),
        collections: CollectionsFactory.sample(),
      },
    });

    expect(
      getByText("You don't have any saved resources, yet."),
    ).toBeInTheDocument();
  });

  it('when a user has a collection display title, description and action buttons and link to the collection page ', () => {
    const collection = {
      ...getCollectionWithData('123'),
      videoIds: [
        { value: 'test', links: { self: new Link({ href: 'test' }) } },
      ],
    };

    const { getByText } = renderWithStore(<MyResourcesListView />, {
      initialState: {
        entities: EntitiesFactory.sample({
          collections: {
            byId: {
              [collection.id]: collection,
            },
          },
          videos: {
            byId: {
              test: VideoFactory.sample(),
            },
          },
        }),
        collections: CollectionsFactory.sample({
          myResources: { items: [collection.id], links: {} },
        }),
      },
    });

    expect(getByText(collection.title)).toBeInTheDocument();
    expect(getByText(collection.title)).toHaveAttribute(
      'href',
      `/collections/${collection.id}`,
    );

    expect(getByText(collection.description)).toBeInTheDocument();

    expect(getByText('Edit')).toBeInTheDocument();
  });

  it('only show my collections and bookmarked collections', () => {
    const myCollection = getCollectionWithData('123');
    const bookmarkedCollection = getCollectionWithData(
      '456',
      'bookmarked',
      'not-my-collection',
    );

    const { queryByText } = renderWithStore(<MyResourcesListView />, {
      initialState: {
        entities: EntitiesFactory.sample({
          collections: {
            byId: {
              [myCollection.id]: myCollection,
              [bookmarkedCollection.id]: bookmarkedCollection,
              'other-567': VideoCollectionFactory.sample({ title: 'Other' }),
              'other-789': VideoCollectionFactory.sample({ title: 'Another' }),
            },
          },
        }),
        collections: CollectionsFactory.sample({
          myResources: {
            items: [myCollection.id, bookmarkedCollection.id],
            links: {},
          },
        }),
      },
    });

    expect(queryByText(myCollection.title)).toBeInTheDocument();
    expect(queryByText(bookmarkedCollection.title)).toBeInTheDocument();
    expect(queryByText('Other')).not.toBeInTheDocument();
    expect(queryByText('Another')).not.toBeInTheDocument();
  });

  it('when user deletes a collection, it is no longer shown in the page', async () => {
    const myCollectionToDelete = getCollectionWithData('123', 'delete this');
    const myOtherCollection = getCollectionWithData('456', 'sample');

    // Intentionally not using ApiStub so we only set up what is needed
    MockFetchVerify.delete(`/v1/collections/${myCollectionToDelete.id}/delete`);

    const wrapper = renderWithStore(<MyResourcesListView />, {
      initialState: createStateWithMyResources([
        myCollectionToDelete,
        myOtherCollection,
      ]),
      reducers: collectionHandlers,
      middlewares: collectionMiddleware,
    });

    // Before delete
    const myCollectionsBeforeDelete = wrapper.getAllByTestId('collection-card');
    expect(myCollectionsBeforeDelete).toHaveLength(2);

    // Get one to delete
    const collectionToBeDeleted = myCollectionsBeforeDelete[0];
    const collectionNotToBeDeleted = myCollectionsBeforeDelete[1];

    fireEvent.click(
      within(collectionToBeDeleted).getByTestId('collection-edit-button'),
    );

    fireEvent.click(await wrapper.findByTestId('delete-collection'));

    // Check the delete confirmation dialog
    fireEvent.click(await wrapper.findByText('Delete'));

    // Verify that the right collection is removed
    await waitForElementToBeRemoved(() =>
      document.querySelector(`[id="${myCollectionToDelete.id}"]`),
    );
    expect(collectionToBeDeleted).not.toBeInTheDocument();

    const collectionsAfterDelete = wrapper.getAllByTestId('collection-card');
    expect(collectionsAfterDelete).toHaveLength(1);
    expect(collectionNotToBeDeleted).toBeInTheDocument();
  });
});

function createStateWithMyResources(myResources: VideoCollection[]) {
  const collectionObjects: {
    [key: string]: VideoCollection;
  } = myResources.reduce((object, collection) => {
    object[collection.id] = collection;
    return object;
  }, {});

  return {
    entities: EntitiesFactory.sample({
      collections: {
        byId: collectionObjects,
      },
    }),
    collections: CollectionsFactory.sample({
      myResources: {
        items: myResources.map((it) => it.id),
        links: {},
      },
      myCollections: {
        items: ['123'],
        links: {},
      },
    }),
    subjects: [],
  };
}

function getCollectionWithData(
  id: string,
  title: string = 'Sample title',
  owner: string = 'user-123',
): VideoCollection {
  return VideoCollectionFactory.sample({
    id,
    title,
    description: 'Sample description',
    createdBy: owner,
    links: VideoCollectionLinksFactory.sample({
      edit: new Link({
        href: `/v1/collections/${id}/edit`,
        templated: false,
      }),
      remove: new Link({
        href: `/v1/collections/${id}/delete`,
        templated: false,
      }),
    }),
  });
}
