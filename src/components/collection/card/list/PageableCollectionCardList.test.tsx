import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { By } from '../../../../../test-support/By';
import {
  CollectionsFactory,
  MockStoreFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
} from '../../../../../test-support/factories';
import { fetchPageableCollectionsAction } from '../../redux/actions/fetchPageableCollectionsAction';
import PageableCollectionCardList from './PageableCollectionCardList';

describe('some collection', () => {
  test('dispatches a fetch collection action if none when mounted', () => {
    const store = MockStoreFactory.sample({
      collections: {} as any,
    });

    mount(
      <Provider store={store}>
        <PageableCollectionCardList
          title={'blah'}
          maxNumberOfCollections={1}
          description=""
          collectionKey="bookmarkedCollections"
        />
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(1);
    expect(store.getActions()).toContainEqual(
      fetchPageableCollectionsAction('bookmarkedCollections'),
    );
  });

  test('does not fetch a collection if component has some collections when mounted', () => {
    const store = MockStoreFactory.sample({
      collections: CollectionsFactory.sample({
        bookmarkedCollections: PageableCollectionsFactory.sample({
          items: [VideoCollectionFactory.sample()],
        }),
      }),
    });

    mount(
      <Provider store={store}>
        <MemoryRouter>
          <PageableCollectionCardList
            title={'blah'}
            maxNumberOfCollections={1}
            description=""
            collectionKey="bookmarkedCollections"
          />
        </MemoryRouter>
      </Provider>,
    );

    expect(store.getActions()).toHaveLength(0);
  });

  test('renders empty component if no collections', () => {
    const store = MockStoreFactory.sample({
      collections: {} as any,
    });

    const wrapper = mount(
      <Provider store={store}>
        <PageableCollectionCardList
          title={'blah'}
          maxNumberOfCollections={1}
          description=""
          collectionKey="bookmarkedCollections"
          renderIfEmptyCollection={<div data-qa="test">Hello</div>}
        />
      </Provider>,
    );

    expect(wrapper.find(By.dataQa('test')).text()).toEqual('Hello');
  });
});