import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { MockStoreFactory } from '../../../../test-support/factories';
import { fetchPublicCollectionsAction } from '../redux/actions/fetchPublicCollectionsAction';
import PublicCollectionsGrid from './PublicCollectionsGrid';

test('dispatches fetch public collection if none when mounted', () => {
  const store = MockStoreFactory.sample({
    collections: {} as any,
  });

  mount(
    <Provider store={store}>
      <PublicCollectionsGrid maxNumberOfCollections={1} description="" />
    </Provider>,
  );

  expect(store.getActions()).toContainEqual(fetchPublicCollectionsAction());
});

test('dispatches does not fetch public collection if some when mounted', () => {
  const store = MockStoreFactory.sample();

  mount(
    <Provider store={store}>
      <MemoryRouter>
        <PublicCollectionsGrid maxNumberOfCollections={1} description="" />
      </MemoryRouter>
    </Provider>,
  );

  expect(store.getActions()).toHaveLength(0);
});
