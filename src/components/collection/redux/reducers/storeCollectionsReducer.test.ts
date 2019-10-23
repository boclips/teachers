import {
  CollectionsFactory,
  MockStoreFactory,
  VideoCollectionFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import State from '../../../../types/State';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { storeCollectionsAction } from '../actions/storeCollectionsAction';
import { EntitiesFactory } from './../../../../../test-support/factories';
import { collectionHandlers } from './collectionsReducer';

const testReducer = createReducer(...collectionHandlers);

test('can store my collections', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const collections = CollectionsFactory.sample({ myCollections: undefined });

  const stateBefore: State = MockStoreFactory.sampleState({
    entities: EntitiesFactory.sample({ collections: { byId: {} } }),
    collections,
  });

  const action = storeCollectionsAction({
    collections: {
      items: [collectionToFetch],
      links: {},
    },
    key: 'myCollections',
  });

  const stateAfter = testReducer(stateBefore, action);

  expect(stateAfter.collections.myCollections.items).toEqual([
    collectionToFetch.id,
  ]);
  expect(stateAfter.entities.collections.byId).toEqual({
    [collectionToFetch.id]: collectionToFetch,
  });
});

test('can store a collection', () => {
  const collectionToFetch = VideoCollectionFactory.sample();

  const collections = CollectionsFactory.sample({ myCollections: undefined });

  const stateBefore: State = MockStoreFactory.sampleState({
    entities: EntitiesFactory.sample({ collections: { byId: {} } }),
    collections,
  });

  const action = storeCollectionAction(collectionToFetch);

  const stateAfter = testReducer(stateBefore, action);

  expect(stateAfter.collections.collectionIdBeingViewed).toEqual(
    collectionToFetch.id,
  );
  expect(stateAfter.entities.collections.byId).toEqual({
    [collectionToFetch.id]: collectionToFetch,
  });
});
