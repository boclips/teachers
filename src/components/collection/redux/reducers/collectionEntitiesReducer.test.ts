import {
  EntitiesFactory,
  MockStoreFactory,
  VideoCollectionFactory,
} from './../../../../../test-support/factories';
import { getCollectionsByIds } from './collectionEntitiesReducer';

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
});
