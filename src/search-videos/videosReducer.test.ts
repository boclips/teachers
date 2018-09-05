import { VideosStateValue } from '../State';
import { storeVideosAction } from './searchVideosMiddleware';
import { searchVideosAction } from './SearchView';
import { videosReducer } from './videosReducer';

test('Clears videos and sets loading flag and query on the loading action', () => {
  const state: VideosStateValue = {
    loading: false,
    items: [{ title: 'my video' }],
    query: '',
  };

  const newState = videosReducer(state, searchVideosAction('donuts'));

  const expectedState: VideosStateValue = {
    loading: true,
    items: [],
    query: 'donuts',
  };

  expect(newState).toEqual(expectedState);
});

test('Sets videos and clears loading flag on the store action', () => {
  const state: VideosStateValue = {
    loading: true,
    items: [],
    query: 'pancakes',
  };

  const newState = videosReducer(
    state,
    storeVideosAction([{ title: 'my video' }]),
  );

  const expectedState: VideosStateValue = {
    loading: false,
    items: [{ title: 'my video' }],
    query: 'pancakes',
  };

  expect(newState).toEqual(expectedState);
});
