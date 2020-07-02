import {
  EntitiesFactory,
  MockStoreFactory,
  SearchFactory,
  VideoCollectionFactory,
  VideoFactory,
  VideoSearchFactory,
  CollectionSearchFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import {
  CollectionSearchResult,
  VideoSearchResult,
} from '../../../../types/SearchResults';
import State, {
  CollectionSearchStateValue,
  VideoSearchStateValue,
} from '../../../../types/State';
import { searchCollectionsAction } from '../actions/searchCollectionsActions';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';

import {
  collectionSearchHandlers,
  getCollectionsFromSearchResult,
  getVideosFromSearchResult,
  videoSearchHandlers,
} from './searchReducer';

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
          videoIds: [VideoFactory.sample().id],
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
        filters: {},
        sortBy: null,
      }),
    );

    const expectedState: VideoSearchStateValue = {
      loading: true,
      videoIds: [],
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
          videoIds: [],
          query: 'pancakes',
          paging: defaultPaging,
        },
      }),
    });

    const video = VideoFactory.sample({ title: 'dog video' });

    const searchResults: VideoSearchResult = {
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
      videoIds: [video.id],
      query: 'dogs',
      paging: defaultPaging,
    };

    expect(newState.search.videoSearch).toEqual(expectedState);
    expect(newState.entities.videos.byId[video.id]).toEqual(video);
  });

  it('can store search facets', () => {
    const stateBefore = MockStoreFactory.sampleState({});

    const facets = {
      subjects: {},
      ageRanges: {},
      durations: {},
      resourceTypes: {},
    };

    const newState = searchReducer(
      stateBefore,
      storeVideoSearchResultsAction({
        videos: [],
        facets,
        query: 'dogs',
        paging: defaultPaging,
      }),
    );

    expect(newState.search.videoSearch.facets.subjects).toBeDefined();
    expect(newState.search.videoSearch.facets.subjects).toBeDefined();
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
    const searchResults: CollectionSearchResult = {
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

describe('selectors', () => {
  it('can get videos from video search results', () => {
    const firstVideo = VideoFactory.sample({ id: '123' });
    const secondVideo = VideoFactory.sample({ id: '456' });
    const state = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        videos: {
          byId: { [firstVideo.id]: firstVideo, [secondVideo.id]: secondVideo },
        },
      }),
      search: SearchFactory.sample({
        videoSearch: VideoSearchFactory.sample({ videoIds: [firstVideo.id] }),
      }),
    });
    const foundVideos = getVideosFromSearchResult(state);

    expect(foundVideos).toHaveLength(1);
    expect(foundVideos).toContain(firstVideo);
  });

  it('can get collections from collection search results', () => {
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
      search: SearchFactory.sample({
        collectionSearch: CollectionSearchFactory.sample({
          collectionIds: [firstCollection.id],
        }),
      }),
    });
    const foundCollections = getCollectionsFromSearchResult(state);

    expect(foundCollections).toHaveLength(1);
    expect(foundCollections).toContain(firstCollection);
  });
});
