import Mock = jest.Mock;

jest.mock('./searchVideos');

import configureStore from 'redux-mock-store';
import { Link } from '../links/Link';
import eventually from '../test-support/eventually';
import searchVideos from './searchVideos';
import searchVideosMiddleware, {
  storeVideosAction,
} from './searchVideosMiddleware';
import { searchVideosAction } from './SearchView';

const searchVideosMock = searchVideos as Mock;

const mockStore = configureStore([searchVideosMiddleware]);

describe('on successful search', () => {
  test('dispatches video service', async () => {
    searchVideosMock.mockReturnValue(
      Promise.resolve([
        { title: 'video about cats' },
        { title: 'video about dogs' },
      ]),
    );

    const store = mockStore({
      links: { videos: new Link({ href: '/videos' }) },
    });

    store.dispatch(searchVideosAction('llama'));

    await eventually(() =>
      expect(store.getActions()).toContainEqual(
        storeVideosAction([
          { title: 'video about cats' },
          { title: 'video about dogs' },
        ]),
      ),
    );
  });
});
