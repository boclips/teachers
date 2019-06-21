import { push, RouterState } from 'connected-react-router';
import configureStore from 'redux-mock-store';
import eventually from '../../../../../test-support/eventually';
import { RouterFactory } from '../../../../../test-support/factories';
import { clearSearchFilterParametersAction } from '../actions/clearSearchFilterParametersAction';
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
  const store = setupStore('q=test&page=1&duration_max=1');
  store.dispatch(updateSearchParamsAction({ q: '123' }));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?duration_max=1&page=1&q=123'),
    );
  });
});

it('updates duration filter in url parameters', async () => {
  const store = setupStore('q=hi');

  store.dispatch(
    updateSearchParamsAction({
      duration_min: 123,
      duration_max: 4321,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?duration_max=4321&duration_min=123&q=hi'),
    );
  });
});

it('updates age range filter in url parameters', async () => {
  const store = setupStore('q=hi');

  store.dispatch(
    updateSearchParamsAction({
      age_range_min: 5,
      age_range_max: 11,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?age_range_max=11&age_range_min=5&q=hi'),
    );
  });
});

it('updates subject filter in url parameters', async () => {
  const store = setupStore('q=hi');

  store.dispatch(
    updateSearchParamsAction({
      subject: '5',
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?q=hi&subject=5'));
  });
});

it('does not include null values in url parameters', async () => {
  const store = setupStore('');

  store.dispatch(
    updateSearchParamsAction({
      duration_min: 123,
      duration_max: undefined,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?duration_min=123'));
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

it('updates multiple url parameters in one dispatch', async () => {
  const store = setupStore('mode=hello&q=hi');

  const durationUpdate = {
    duration_max: 1,
    duration_min: 2,
  };

  const modeUpdate = { mode: 'test' };

  store.dispatch(bulkUpdateSearchParamsAction([durationUpdate, modeUpdate]));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?duration_max=1&duration_min=2&mode=test&q=hi'),
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

it('ignores all previous values on override action', async () => {
  const store = setupStore(
    'mode=hello&q=hi&test=1&blah=123&duration_max=hello',
  );

  store.dispatch(bulkOverrideSearchParamsAction([{ q: '123' }]));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?q=123'));
  });
});

it('clears filter on clear search filters action', async () => {
  const store = setupStore(
    'mode=hello&q=hi&duration_max=hello&duration_min=123&age_range_min=5&age_range_max=11&subject=1',
  );

  store.dispatch(clearSearchFilterParametersAction());

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?mode=hello&q=hi'));
  });
});
