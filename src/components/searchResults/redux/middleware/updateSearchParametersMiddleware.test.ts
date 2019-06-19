import { push, RouterState } from 'connected-react-router';
import configureStore from 'redux-mock-store';
import eventually from '../../../../../test-support/eventually';
import { RouterFactory } from '../../../../../test-support/factories';
import {
  bulkOverrideSearchParamsAction,
  bulkUpdateSearchParamsAction,
  updateSearchParamsAction,
} from '../actions/updateSearchParametersActions';
import UpdateSearchParametersMiddleware from './updateSearchParametersMiddleware';

const setupStore = (query: string) => {
  const mockStore = configureStore<{ router: RouterState }>([
    ...UpdateSearchParametersMiddleware,
  ]);

  return mockStore({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: `?${query}`,
        hash: '',
        state: null,
      },
    }),
  });
};

it('updates query in url parameters', async () => {
  const store = setupStore('q=test&page=1&max_duration=1');
  store.dispatch(updateSearchParamsAction({ q: '123' }));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?max_duration=1&page=1&q=123'),
    );
  });
});

it('updates duration filter in url parameters', async () => {
  const store = setupStore('q=hi');

  store.dispatch(
    updateSearchParamsAction({
      min_duration: 123,
      max_duration: 4321,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?max_duration=4321&min_duration=123&q=hi'),
    );
  });
});

it('does not include null values in url parameters', async () => {
  const store = setupStore('');

  store.dispatch(
    updateSearchParamsAction({
      min_duration: 123,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?min_duration=123'));
  });
});

it('updates page in url parameters', async () => {
  const store = setupStore('q=hi&page=1');

  store.dispatch(
    updateSearchParamsAction({
      page: 2,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?page=2&q=hi'));
  });
});

it('updates mode in url parameters', async () => {
  const store = setupStore('q=hi&page=1');

  store.dispatch(updateSearchParamsAction({ mode: 'news' }));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?mode=news&page=1&q=hi'),
    );
  });
});

it('updates mutliple url parameters in one dispatch', async () => {
  const store = setupStore('mode=hello&q=hi');

  const durationUpdate = {
    max_duration: 1,
    min_duration: 2,
  };

  const modeUpdate = { mode: 'test' };

  store.dispatch(bulkUpdateSearchParamsAction([durationUpdate, modeUpdate]));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?max_duration=1&min_duration=2&mode=test&q=hi'),
    );
  });
});

it('removes parameters if they are undefined', async () => {
  const store = setupStore('mode=hello&q=hi');

  store.dispatch(updateSearchParamsAction({ mode: undefined }));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?q=hi'));
  });
});

it('ignores all previous values on override aciton', async () => {
  const store = setupStore(
    'mode=hello&q=hi&test=1&blah=123&max_duration=hello',
  );

  store.dispatch(bulkOverrideSearchParamsAction([{ q: '123' }]));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?q=123'));
  });
});
