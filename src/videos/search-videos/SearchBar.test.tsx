import { push, RouterActionType } from 'connected-react-router';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import { RouterState } from '../../State';
import SearchBar from './SearchBar';
import StatefulSearchBar from './StatefulSearchBar';

const mockStore = configureStore<RouterState>();

let store: MockStore;

let statefulSearchBar: ReactWrapper<any>;

beforeEach(() => {
  store = mockStore({
    router: {
      location: {
        pathname: '',
        search: '?q=eggs',
        hash: '',
        state: null,
      },
      action: 'PUSH' as RouterActionType,
    },
  });

  const wrapper = mount(
    <Provider store={store}>
      <SearchBar />
    </Provider>,
  );

  statefulSearchBar = wrapper.find(StatefulSearchBar);
});

test('Extracts query string from the router state', () => {
  expect(statefulSearchBar).toHaveProp('value', 'eggs');
});

test('dispatches a navigation action when query submitted callback invoked', () => {
  statefulSearchBar.prop('onQuerySubmitted')('the meaning of life');
  expect(store.getActions()).toContainEqual(
    push('/videos?pageNumber=1&q=the%20meaning%20of%20life'),
  );
});
