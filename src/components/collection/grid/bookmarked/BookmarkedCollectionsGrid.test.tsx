import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../../../test-support/By';
import {
  MockStoreFactory,
  PageableCollectionsFactory,
} from '../../../../../test-support/factories';
import { fetchPageableCollectionsAction } from '../../redux/actions/fetchPageableCollectionsAction';
import BookmarkedCollectionsGrid from './BookmarkedCollectionsGrid';

describe('bookmarked collections', () => {
  test('dispatches fetch bookmark collection if none when mounted', () => {
    const store = MockStoreFactory.sample({
      collections: {} as any,
    });

    mount(
      <Provider store={store}>
        <BookmarkedCollectionsGrid maxNumberOfCollections={1} />
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(
      fetchPageableCollectionsAction({ key: 'bookmarkedCollections' }),
    );
  });

  test('displays empty message when no collections have been bookmared', () => {
    const store = MockStoreFactory.sample({
      collections: {
        byId: {},
        loading: false,
        updating: false,
        myCollections: undefined,
        discoverCollections: undefined,
        publicCollections: undefined,
        bookmarkedCollections: PageableCollectionsFactory.sample({
          items: [],
        }),
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <BookmarkedCollectionsGrid maxNumberOfCollections={1} />
      </Provider>,
    );

    expect(wrapper.find(By.dataQa('no-collections'))).toHaveText(
      'You have no bookmarks, yet.',
    );
  });
});
