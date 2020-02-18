import { push } from 'connected-react-router';
import eventually from 'test-support/eventually';
import { setupStore } from 'test-support/setupStore';
import { updatePageAction } from '../actions/updatePageAction';

it('updates page in url parameters', async () => {
  const store = setupStore('q=hi&page=1');

  store.dispatch(
    updatePageAction({
      page: 2,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?page=2&q=hi'));
  });
});

it('defaults to page 1 in url parameters if given null', async () => {
  const store = setupStore('q=hi&page=1');

  store.dispatch(
    updatePageAction({
      page: null,
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(push('/videos?page=1&q=hi'));
  });
});
