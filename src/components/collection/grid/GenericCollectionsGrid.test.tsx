import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { MockStoreFactory } from '../../../../test-support/factories';
import { fetchReadOnlyCollectionsAction } from '../redux/actions/fetchReadOnlyCollectionsAction';
import GenericCollectionsGrid from './GenericCollectionsGrid';

describe('public collections', () => {
  test('dispatches fetch public collection if none when mounted', () => {
    const store = MockStoreFactory.sample({
      collections: {} as any,
    });

    mount(
      <Provider store={store}>
        <GenericCollectionsGrid
          maxNumberOfCollections={1}
          description=""
          collectionKey="publicCollections"
        />
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(
      fetchReadOnlyCollectionsAction('publicCollections'),
    );
  });

  test('does not fetch public collection if some when mounted', () => {
    const store = MockStoreFactory.sample();

    mount(
      <Provider store={store}>
        <MemoryRouter>
          <GenericCollectionsGrid
            maxNumberOfCollections={1}
            description=""
            collectionKey="publicCollections"
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(0);
  });
});

describe('bookmarked collections', () => {
  test('dispatches fetch bookmark collection if none when mounted', () => {
    const store = MockStoreFactory.sample({
      collections: {} as any,
    });

    mount(
      <Provider store={store}>
        <GenericCollectionsGrid
          maxNumberOfCollections={1}
          description=""
          collectionKey="bookmarkedCollections"
        />
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(
      fetchReadOnlyCollectionsAction('bookmarkedCollections'),
    );
  });

  test('does not fetch public collection if some when mounted', () => {
    const store = MockStoreFactory.sample();

    mount(
      <Provider store={store}>
        <MemoryRouter>
          <GenericCollectionsGrid
            maxNumberOfCollections={1}
            description=""
            collectionKey="bookmarkedCollections"
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(0);
  });
});
