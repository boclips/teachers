import ApiStub from '../../../../../test-support/ApiStub';
import {
  MockStoreFactory,
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { createReducer } from '../../../../app/redux/createReducer';
import State, {
  CollectionSearchResults,
  CollectionSearchStateValue,
  VideoSearchResults,
  VideoSearchStateValue,
} from '../../../../types/State';
import { onCollectionBookmarkedAction } from '../../../collection/redux/actions/onCollectionBookmarkedAction';
import { storeVideosForCollectionAction } from '../../../collection/redux/actions/storeVideosForCollectionAction';
import { storeVideoAction } from '../../../video/redux/actions/storeVideoAction';
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
          videos: [VideoFactory.sample({ title: 'my video' })],
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

    const searchResults: VideoSearchResults = {
      videos: [VideoFactory.sample({ title: 'dog video' })],
      query: 'dogs',
      paging: defaultPaging,
    };

    const newState = searchReducer(
      state,
      storeVideoSearchResultsAction(searchResults),
    );

    const expectedState: VideoSearchStateValue = {
      loading: false,
      videos: [VideoFactory.sample({ title: 'dog video' })],
      query: 'dogs',
      paging: defaultPaging,
    };

    expect(newState.search.videoSearch).toEqual(expectedState);
  });

  test('Updates video on video store action', () => {
    const state: State = MockStoreFactory.sampleState({
      search: SearchFactory.sample({
        videoSearch: {
          loading: false,
          videos: [VideoFactory.sample({ title: 'dog video' })],
          query: 'pancakes',
          paging: defaultPaging,
        },
      }),
    });

    const newState = searchReducer(
      state,
      storeVideoAction(VideoFactory.sample({ title: 'cat video' })),
    );

    const expectedState: VideoSearchStateValue = {
      loading: false,
      videos: [VideoFactory.sample({ title: 'cat video' })],
      query: 'pancakes',
      paging: defaultPaging,
    };

    expect(newState.search.videoSearch).toEqual(expectedState);
  });
});

describe('searching collections', () => {
  test('Clears collections and sets loading flag and query on the loading action', () => {
    const state: State = MockStoreFactory.sampleState({
      search: SearchFactory.sample({
        collectionSearch: {
          loading: false,
          collections: [
            VideoCollectionFactory.sample({ title: 'my collection' }),
          ],
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
      collections: [],
      query: 'donuts',
    };

    expect(newState.search.collectionSearch).toEqual(expectedState);
  });

  test('Sets collections and clears loading flag on the store action', () => {
    const state: State = MockStoreFactory.sampleState({
      search: SearchFactory.sample({
        collectionSearch: {
          loading: true,
          collections: [],
          query: 'pancakes',
        },
      }),
    });

    const searchResults: CollectionSearchResults = {
      collections: [VideoCollectionFactory.sample({ title: 'dog collection' })],
      query: 'dogs',
    };

    const newState = searchReducer(
      state,
      storeCollectionSearchResultsAction(searchResults),
    );

    const expectedState: CollectionSearchStateValue = {
      loading: false,
      collections: [VideoCollectionFactory.sample({ title: 'dog collection' })],
      query: 'dogs',
    };

    expect(newState.search.collectionSearch).toEqual(expectedState);
  });

  test('sets videos in searched collections', () => {
    const video = VideoFactory.sample({ id: '123' });

    new ApiStub().fetchVideo({ video });

    const collection = VideoCollectionFactory.sample({
      id: 'target',
      videoIds: [
        {
          id: video.id,
          links: video.links,
        },
      ],
    });

    const stateBefore: State = MockStoreFactory.sampleState({
      search: SearchFactory.sample({
        collectionSearch: {
          collections: [collection],
          query: 'dog',
          loading: false,
        },
      }),
    });

    const action = storeVideosForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = searchReducer(stateBefore, action).search
      .collectionSearch;

    expect(Object.keys(stateAfter.collections[0].videos)).toHaveLength(1);
    expect(stateAfter.collections[0].videos[video.id].title).toEqual(
      video.title,
    );
    expect(stateAfter.collections[0].videos[video.id].id).toEqual(video.id);
    expect(stateAfter.collections[0].videoIds).toHaveLength(1);
  });

  // TODO: fix this bug
  describe('interacting with results', () => {
    test('bookmarking results updates collection search results', () => {
      const toBeUpdatedCollection = VideoCollectionFactory.sample({
        id: '123',
        title: 'jose carlos',
      });

      const stateBefore: State = MockStoreFactory.sampleState({
        search: SearchFactory.sample({
          videoSearch: undefined,
          collectionSearch: {
            collections: [toBeUpdatedCollection],
            loading: false,
            query: '',
          },
        }),
      });

      const updatedCollection = {
        ...toBeUpdatedCollection,
        title: 'la familia es muy importante',
      };

      const action = onCollectionBookmarkedAction(updatedCollection);

      const collections = searchReducer(stateBefore, action).search
        .collectionSearch.collections;

      expect(collections).toHaveLength(1);
      expect(collections).toContainEqual(updatedCollection);
    });
  });
});
