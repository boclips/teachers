import ApiStub from '../../../../../test-support/ApiStub';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import {
  CollectionSearchResults,
  CollectionSearchStateValue,
  SearchStateValue,
  VideoSearchResults,
  VideoSearchStateValue,
} from '../../../../types/State';
import { onCollectionBookmarkedAction } from '../../../collection/redux/actions/onCollectionBookmarkedAction';
import { storeVideoForCollectionAction } from '../../../collection/redux/actions/storeVideoForCollectionAction';
import { storeVideoAction } from '../../../video/redux/actions/storeVideoAction';
import { searchCollectionsAction } from '../actions/searchCollectionsActions';
import { searchVideosAction } from '../actions/searchVideosActions';
import { storeCollectionSearchResultsAction } from '../actions/storeCollectionSearchResultsAction';
import { storeVideoSearchResultsAction } from '../actions/storeVideoSearchResultsAction';
import {
  collectionSearchReducer,
  searchReducer,
  videoSearchReducer,
} from './searchReducer';

describe('searching videos', () => {
  const defaultPaging = {
    totalElements: 0,
    totalPages: 0,
    number: 0,
    size: 10,
  };

  test('Clears videos and sets loading flag and query on the loading action', () => {
    const state: VideoSearchStateValue = {
      loading: false,
      videos: [VideoFactory.sample({ title: 'my video' })],
      query: '',
      paging: defaultPaging,
    };

    const newState = videoSearchReducer(
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

    expect(newState).toEqual(expectedState);
  });

  test('Sets videos and clears loading flag on the store action', () => {
    const state: VideoSearchStateValue = {
      loading: true,
      videos: [],
      query: 'pancakes',
      paging: defaultPaging,
    };

    const searchResults: VideoSearchResults = {
      videos: [VideoFactory.sample({ title: 'dog video' })],
      query: 'dogs',
      paging: defaultPaging,
    };

    const newState = videoSearchReducer(
      state,
      storeVideoSearchResultsAction(searchResults),
    );

    const expectedState: VideoSearchStateValue = {
      loading: false,
      videos: [VideoFactory.sample({ title: 'dog video' })],
      query: 'dogs',
      paging: defaultPaging,
    };

    expect(newState).toEqual(expectedState);
  });

  test('Updates video on video store action', () => {
    const state: VideoSearchStateValue = {
      loading: false,
      videos: [VideoFactory.sample({ title: 'dog video' })],
      query: 'pancakes',
      paging: defaultPaging,
    };

    const newState = videoSearchReducer(
      state,
      storeVideoAction(VideoFactory.sample({ title: 'cat video' })),
    );

    const expectedState: VideoSearchStateValue = {
      loading: false,
      videos: [VideoFactory.sample({ title: 'cat video' })],
      query: 'pancakes',
      paging: defaultPaging,
    };

    expect(newState).toEqual(expectedState);
  });
});

describe('searching collections', () => {
  test('Clears collections and sets loading flag and query on the loading action', () => {
    const state: CollectionSearchStateValue = {
      loading: false,
      collections: [VideoCollectionFactory.sample({ title: 'my collection' })],
      query: '',
    };

    const newState = collectionSearchReducer(
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

    expect(newState).toEqual(expectedState);
  });

  test('Sets collections and clears loading flag on the store action', () => {
    const state: CollectionSearchStateValue = {
      loading: true,
      collections: [],
      query: 'pancakes',
    };

    const searchResults: CollectionSearchResults = {
      collections: [VideoCollectionFactory.sample({ title: 'dog collection' })],
      query: 'dogs',
    };

    const newState = collectionSearchReducer(
      state,
      storeCollectionSearchResultsAction(searchResults),
    );

    const expectedState: CollectionSearchStateValue = {
      loading: false,
      collections: [VideoCollectionFactory.sample({ title: 'dog collection' })],
      query: 'dogs',
    };

    expect(newState).toEqual(expectedState);
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

    const stateBefore: CollectionSearchStateValue = {
      collections: [collection],
      query: 'dog',
      loading: false,
    };

    const action = storeVideoForCollectionAction({
      videos: [video],
      collection,
    });

    const stateAfter = collectionSearchReducer(stateBefore, action);

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

      const stateBefore: SearchStateValue = {
        videoSearch: undefined,
        collectionSearch: {
          collections: [toBeUpdatedCollection],
          loading: false,
          query: '',
        },
      };

      const updatedCollection = {
        ...toBeUpdatedCollection,
        title: 'la familia es muy importante',
      };

      const action = onCollectionBookmarkedAction(updatedCollection);

      const publicCollections = searchReducer(stateBefore, action)
        .collectionSearch.collections;

      expect(publicCollections).toHaveLength(1);
      expect(publicCollections).toContainEqual(updatedCollection);
    });
  });
});
