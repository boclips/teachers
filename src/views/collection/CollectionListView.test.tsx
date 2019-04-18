import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../test-support/By';
import { MockStoreFactory } from '../../../test-support/factories';
import CollectionListView from './CollectionListView';

function render(collection) {
  const store = MockStoreFactory.sample({
    collections: collection,
  });

  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={createMemoryHistory()}>
        <CollectionListView />
      </ConnectedRouter>
    </Provider>,
  );

  return { store, wrapper };
}

test('displays an empty state when no collections', () => {
  const { wrapper } = render({
    loading: false,
    updating: false,
    myCollections: [],
  });

  expect(wrapper.find(By.dataQa('no-collections'))).toHaveText(
    'You have no collections, yet.',
  );
});
