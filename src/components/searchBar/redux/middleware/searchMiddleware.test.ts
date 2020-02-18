import { mocked } from 'ts-jest/utils';
import { CollectionSearchRequest } from 'src/types/CollectionSearchRequest';
import { MockStoreFactory } from 'test-support/factories';
import { searchCollections } from 'src/services/collections/searchCollections';
import { CollectionSearchResult } from 'src/types/SearchResults';
import eventually from 'test-support/eventually';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { onSearchCollections } from './searchMiddleware';

jest.mock('../../../../services/collections/searchCollections');

describe('collection search middleware', () => {
  it('makes an API call when no filters applied', () => {
    const store = MockStoreFactory.sample();

    const collectionSearchResult: CollectionSearchResult = {
      query: 'dogs',
      collections: [],
    };
    mocked(searchCollections).mockResolvedValue(collectionSearchResult);

    const searchRequest: CollectionSearchRequest = {
      query: 'dogs',
    };

    onSearchCollections(store, searchRequest);

    expect(searchCollections).toHaveBeenCalledTimes(1);

    return eventually(() => {
      expect(store.getActions()).toHaveLength(1);
      expect(store.getActions()[0].type).toEqual(
        storeCollectionSearchResultsAction.type,
      );
      expect(store.getActions()[0].payload).toEqual(collectionSearchResult);
    });
  });

  it('make an API call when subject filter is applied', () => {
    const store = MockStoreFactory.sample();

    const collectionSearchResult: CollectionSearchResult = {
      query: 'dogs',
      collections: [],
    };
    mocked(searchCollections).mockResolvedValue(collectionSearchResult);

    const searchRequest: CollectionSearchRequest = {
      query: 'dogs',
      filters: {
        subject: 'subject-id-1',
      },
    };

    onSearchCollections(store, searchRequest);

    expect(searchCollections).toHaveBeenCalledTimes(1);

    return eventually(() => {
      expect(store.getActions()).toHaveLength(1);
      expect(store.getActions()[0].type).toEqual(
        storeCollectionSearchResultsAction.type,
      );
      expect(store.getActions()[0].payload).toEqual(collectionSearchResult);
    });
  });
});
