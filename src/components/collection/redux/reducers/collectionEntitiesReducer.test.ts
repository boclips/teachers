import {
  EntitiesFactory,
  MockStoreFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import {
  collectionUpdated,
  getCollectionsByIds,
} from './collectionEntitiesReducer';

describe('selectors', () => {
  it('can get collections by ids', () => {
    const firstCollection = VideoCollectionFactory.sample({ id: '123' });
    const secondCollection = VideoCollectionFactory.sample({ id: '456' });

    const state = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: {
          byId: {
            [firstCollection.id]: firstCollection,
            [secondCollection.id]: secondCollection,
          },
        },
      }),
    });

    const foundCollections = getCollectionsByIds(state, ['123', '456']);
    expect(foundCollections).toEqual([firstCollection, secondCollection]);
  });

  it('reorders my resources when video is added to collection', () => {
    const state = MockStoreFactory.sampleState({
      collections: {
        myResources: {
          items: ['1', '2'],
          links: null,
        },
        myCollections: {
          items: ['1'],
          links: null,
        },
        promotedCollections: {
          items: [],
          links: null,
        },
        discoverCollections: {
          items: [],
          links: null,
        },
        updating: false,
        loading: false,
      },
    });

    const collectionState = collectionUpdated(state, {
      collection: VideoCollectionFactory.sample({ id: '2' }),
      video: VideoFactory.sample(),
      success: true,
    });

    expect(collectionState.collections.myResources.items).toEqual(['2', '1']);
  });
});
