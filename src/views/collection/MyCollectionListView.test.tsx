import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../test-support/By';
import {
  CollectionsFactory,
  MockStoreFactory,
  PageableCollectionsFactory,
} from '../../../test-support/factories';
import { CollectionsStateValue } from '../../types/State';
import MyCollectionListView from './MyCollectionListView';

function render(collection: CollectionsStateValue) {
  const store = MockStoreFactory.sample({
    collections: collection,
  });

  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={createMemoryHistory()}>
        <MyCollectionListView />
      </ConnectedRouter>
    </Provider>,
  );

  return { store, wrapper };
}

test('displays an empty state when no collections', () => {
  const { wrapper } = render(
    CollectionsFactory.sample({
      loading: false,
      updating: false,
      myCollections: PageableCollectionsFactory.sample({
        items: [],
      }),
    }),
  );

  expect(wrapper.find(By.dataQa('no-collections'))).toHaveText(
    'You have no collections, yet.',
  );
});
