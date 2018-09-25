import { LocationState } from '../State';
import getPreviousPath from './getPreviousPath';

test('when state is undefined returns root path', () => {
  expect(getPreviousPath(undefined)).toEqual('/');
});

test('when from is undefined returns root path', () => {
  expect(getPreviousPath({})).toEqual('/');
});

test('when from object is there returns previous path with query params', () => {
  const state: LocationState = {
    from: {
      pathname: '/videos',
      search: '?q=123',
      hash: '',
      state: null,
    },
  };

  expect(getPreviousPath(state)).toEqual('/videos?q=123');
});
