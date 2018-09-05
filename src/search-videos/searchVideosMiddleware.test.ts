import Mock = jest.Mock;

jest.mock('./searchVideos');

import configureStore, { MockStore } from 'redux-mock-store';
import { Link } from '../links/Link';
import { LinksState } from '../State';
import eventually from '../test-support/eventually';
import searchVideos from './searchVideos';
import searchVideosMiddleware, {
  storeVideosAction,
} from './searchVideosMiddleware';
import { searchVideosAction } from './SearchView';

const searchVideosMock = searchVideos as Mock;

const mockStore = configureStore<LinksState>([searchVideosMiddleware]);

let store: MockStore<LinksState>;

beforeEach(() => {
  store = mockStore({
    links: { videos: new Link({ href: '/videos' }) },
  });
});

describe('on successful search', () => {
  test('dispatches a store action with received videos', async () => {
    searchVideosMock.mockReturnValue(
      Promise.resolve([
        { title: 'video about cats' },
        { title: 'video about dogs' },
      ]),
    );

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
