import { push } from 'connected-react-router';
import eventually from '../../../../../test-support/eventually';
import { setupStore } from '../../../../../test-support/setupStore';
import { clearSearchFilterParametersAction } from '../actions/clearSearchFilterParametersAction';
import {
  bulkOverrideSearchParamsAction,
  bulkUpdateSearchParamsAction,
  updateSearchParamsAction,
} from '../actions/updateSearchParametersActions';

it('updates query in url parameters', async () => {
  const store = setupStore('q=test&duration_max=1');
  store.dispatch(updateSearchParamsAction({ q: '123' }));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?duration_max=1&page=1&q=123'),
    );
  });
});

it('updates duration filter in url parameters', async () => {
  const store = setupStore('q=hi&page=10');

  store.dispatch(
    updateSearchParamsAction({
      duration_min: 123,
      duration_max: 4321,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?duration_max=4321&duration_min=123&page=1&q=hi'),
    );
  });
});

it('updates age range filter in url parameters', async () => {
  const store = setupStore('q=hi&page=10');

  store.dispatch(
    updateSearchParamsAction({
      age_range_min: 5,
      age_range_max: 11,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?age_range_max=11&age_range_min=5&page=1&q=hi'),
    );
  });
});

it('updates subject filter in url parameters', async () => {
  const store = setupStore('q=hi');

  store.dispatch(
    updateSearchParamsAction({
      subject: ['5'],
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?page=1&q=hi&subject=5'),
    );
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
    expect(store.getActions()).toContainEqual(
      push('/videos?duration_min=123&page=1'),
    );
  });
});

it('updates multiple url parameters in one dispatch', async () => {
  const store = setupStore('q=hi&page=1&subject=6');

  const durationUpdate = {
    duration_max: 1,
    duration_min: 2,
  };

  const subjectUpdate = { subject: ['new'] };

  store.dispatch(bulkUpdateSearchParamsAction([durationUpdate, subjectUpdate]));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?duration_max=1&duration_min=2&page=1&q=hi&subject=new'),
    );
  });
});

it('removes parameters if they are undefined', async () => {
  const store = setupStore('subject=5&q=hi');

  store.dispatch(updateSearchParamsAction({ subject: undefined }));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?page=1&q=hi'));
  });
});

it('ignores all previous values on override action', async () => {
  const store = setupStore(
    'mode=hello&q=hi&test=1&blah=123&duration_max=hello&page=10',
  );

  store.dispatch(bulkOverrideSearchParamsAction([{ q: '123' }]));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?page=1&q=123'));
  });
});

it('clears filter on clear search filters action', async () => {
  const store = setupStore(
    'mode=hello&q=hi&duration_max=hello&duration_min=123&age_range_min=5&age_range_max=11&subject=1&page=10',
  );

  store.dispatch(clearSearchFilterParametersAction());

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      push('/videos?mode=hello&page=1&q=hi'),
    );
  });
});
