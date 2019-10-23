import {
  EntitiesFactory,
  MockStoreFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import {
  CollectionsSearchResult,
  VideoSearchResults,
} from '../../../../types/SearchResults';
import State, {
  CollectionSearchStateValue,
  VideoSearchStateValue,
} from '../../../../types/State';
import { searchCollectionsAction } from '../actions/searchCollectionsActions';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';
import { SearchFactory } from './../../../../../test-support/factories';
import { collectionSearchHandlers, videoSearchHandlers } from './searchReducer';

const searchReducer = createReducer(
  ...videoSearchHandlers,
  ...collectionSearchHandlers,
);

describe('searching videos', () => {
  const defaultPaging = {
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 10,
  };

  test('Clears videos and sets loading flag and query on the loading action', () => {
    const state: State = MockStoreFactory.sampleState({
      search: SearchFactory.sample({
        videoSearch: {
          loading: false,
          videos: [VideoFactory.sample().id],
          query: '',
          paging: defaultPaging,
        },
      }),
    });

    const newState = searchReducer(
      state,
      searchVideosAction({
        query: 'donuts',
        page: 1,
        filters: {
          includeTags: [],
          excludeTags: [],
        },
        sortBy: null,
      }),
    );

    const expectedState: VideoSearchStateValue = {
      loading: true,
      videos: [],
      query: 'donuts',
      paging: defaultPaging,
    };

    expect(newState.search.videoSearch).toEqual(expectedState);
  });

  test('Sets videos and clears loading flag on the store action', () => {
    const state: State = MockStoreFactory.sampleState({
      search: SearchFactory.sample({
        videoSearch: {
          loading: true,
          videos: [],
          query: 'pancakes',
          paging: defaultPaging,
        },
      }),
    });

    const video = VideoFactory.sample({ title: 'dog video' });

    const searchResults: VideoSearchResults = {
      videos: [video],
      query: 'dogs',
      paging: defaultPaging,
    };

    const newState = searchReducer(
      state,
      storeVideoSearchResultsAction(searchResults),
    );

    const expectedState: VideoSearchStateValue = {
      loading: false,
      videos: [video.id],
      query: 'dogs',
      paging: defaultPaging,
    };

    expect(newState.search.videoSearch).toEqual(expectedState);
    expect(newState.entities.videos.byId[video.id]).toEqual(video);
  });
});

describe('searching collections', () => {
  test('Clears collections and sets loading flag and query on the loading action', () => {
    const collection = VideoCollectionFactory.sample({
      title: 'my collection',
    });

    const state: State = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        collections: {
          byId: {
            [collection.id]: collection,
          },
        },
      }),
      search: SearchFactory.sample({
        collectionSearch: {
          loading: false,
          collectionIds: [collection.id],
          query: '',
        },
      }),
    });

    const newState = searchReducer(
      state,
      searchCollectionsAction({
        query: 'donuts',
      }),
    );

    const expectedState: CollectionSearchStateValue = {
      loading: true,
      collectionIds: [],
      query: 'donuts',
    };

    expect(newState.search.collectionSearch).toEqual(expectedState);
  });

  test('Sets collections and clears loading flag on the store action', () => {
    const state: State = MockStoreFactory.sampleState({
      search: SearchFactory.sample({
        collectionSearch: {
          loading: true,
          collectionIds: [],
          query: 'pancakes',
        },
      }),
    });

    const collectionToStore = VideoCollectionFactory.sample({
      title: 'dog collection',
    });
    const searchResults: CollectionsSearchResult = {
      collections: [collectionToStore],
      query: 'dogs',
    };

    const newState = searchReducer(
      state,
      storeCollectionSearchResultsAction(searchResults),
    );

    const expectedState: CollectionSearchStateValue = {
      loading: false,
      collectionIds: [collectionToStore.id],
      query: 'dogs',
    };

    expect(newState.search.collectionSearch).toEqual(expectedState);
    expect(newState.entities.collections.byId[collectionToStore.id]).toEqual(
      collectionToStore,
    );
  });
});
