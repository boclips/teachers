import { ConnectedRouter, RouterActionType } from 'connected-react-router';
import { mount } from 'enzyme';
import createMemoryHistory from 'history/createMemoryHistory';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { By } from '../../../test-support/By';
import { Link } from '../../types/Link';
import { CollectionState, RouterState } from '../../types/State';
import CollectionListView, {
  fetchCollectionsAction,
} from './CollectionListView';

const mockStore = configureStore<CollectionState & RouterState>();

function render() {
  const store = mockStore({
    collections: [],
    videoCollection: {
      id: '',
      title: '',
      videos: [],
      links: {
        addVideo: new Link({ href: '' }),
        removeVideo: new Link({ href: '' }),
      },
    },
    router: {
      location: {
        pathname: '',
        search: `?q=${''}`,
        hash: '',
        state: null,
      },
      action: 'PUSH' as RouterActionType,
    },
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

test('dispatches FETCH_COLLECTIONS when mounted', () => {
  const { store } = render();
  expect(store.getActions()).toContainEqual(fetchCollectionsAction());
});

test('displays an empty state when no collections', () => {
  const { wrapper } = render();

  expect(wrapper.find(By.dataQa('no-collections'))).toHaveText(
    'You have no collections',
  );
});
