import { mocked } from 'ts-jest/utils';
import { CollectionSearchRequest } from '../../../../types/CollectionSearchRequest';
import { MockStoreFactory } from '../../../../../test-support/factories';
import searchCollections from '../../../../services/collections/searchCollections';
import { CollectionSearchResult } from '../../../../types/SearchResults';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import eventually from '../../../../../test-support/eventually';
import { onSearchCollections } from './searchMiddleware';
import objectContaining = jasmine.objectContaining;

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

  it('dispatches an empty collectionSearchResponse when filters are applied', () => {
    const store = MockStoreFactory.sample();

    const collectionSearchResult: CollectionSearchResult = {
      query: 'dogs',
      collections: [],
    };
    mocked(searchCollections).mockResolvedValue(collectionSearchResult);

    const searchRequest: CollectionSearchRequest = {
      query: 'dogs',
      filters: {
        includeTags: ['classroom'],
        excludeTags: ['news'],
        duration_min: 10,
        duration_max: undefined,
        age_range_min: undefined,
        age_range_max: undefined,
        subject: undefined,
        promoted: undefined,
      },
    };

    onSearchCollections(store, searchRequest);

    expect(searchCollections).toHaveBeenCalledTimes(0);

    return eventually(() => {
      expect(store.getActions()).toHaveLength(1);
      expect(store.getActions()[0].type).toEqual(
        storeCollectionSearchResultsAction.type,
      );
      expect(store.getActions()[0].payload).toEqual(
        objectContaining({ collections: [] }),
      );
    });
  });
});
