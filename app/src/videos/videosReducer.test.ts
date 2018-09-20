import { VideoFactory } from '../../test-support/factories';
import { VideosStateValue } from '../State';
import { storeVideosAction } from './search-videos/searchVideosMiddleware';
import { searchVideosAction } from './search-videos/SearchView';
import { videosReducer } from './videosReducer';

test('Clears videos and sets loading flag and query on the loading action', () => {
  const state: VideosStateValue = {
    loading: false,
    items: [VideoFactory.sample({ title: 'my video' })],
    query: { phrase: '' },
  };

  const newState = videosReducer(state, searchVideosAction('donuts'));

  const expectedState: VideosStateValue = {
    loading: true,
    items: [],
    query: { phrase: 'donuts' },
  };

  expect(newState).toEqual(expectedState);
});

test('Sets videos and clears loading flag on the store action', () => {
  const state: VideosStateValue = {
    loading: true,
    items: [],
    query: { phrase: 'pancakes' },
  };

  const newState = videosReducer(
    state,
    storeVideosAction([VideoFactory.sample({ title: 'my video' })]),
  );

  const expectedState: VideosStateValue = {
    loading: false,
    items: [VideoFactory.sample({ title: 'my video' })],
    query: { phrase: 'pancakes' },
  };

  expect(newState).toEqual(expectedState);
});
