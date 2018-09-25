import Search from 'antd/lib/input/Search';
import { RouterActionType } from 'connected-react-router';
import { push } from 'connected-react-router';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RouterState } from '../../State';
import { searchVideosAction } from '../SearchLayout';
import SearchBar from './SearchBar';

const mockStore = configureStore<RouterState>();

test('Dispatches search action when mounted and query specified', () => {
  const store = mockStore({
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

  mount(
    <Provider store={store}>
      <SearchBar />
    </Provider>,
  );

  expect(store.getActions()).toContainEqual(searchVideosAction('eggs'));
});

test('Does not dispatch when mounted and no query specified', () => {
  const store = mockStore({
    router: {
      location: {
        pathname: '',
        search: '',
        hash: '',
        state: null,
      },
      action: 'PUSH' as RouterActionType,
    },
  });

  mount(
    <Provider store={store}>
      <SearchBar />
    </Provider>,
  );

  expect(store.getActions()).toEqual([]);
});

test('Dispatches a search action when a query is submitted', () => {
  const store = mockStore({
    router: {
      location: {
        pathname: '',
        search: '',
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

  wrapper.find(Search).prop('onSearch')('japan');

  expect(store.getActions()).toContainEqual(searchVideosAction('japan'));
});

test('Dispatches a navigate action when a query is submitted', () => {
  const store = mockStore({
    router: {
      location: {
        pathname: '',
        search: '',
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

  wrapper.find(Search).prop('onSearch')('meaning of life');

  expect(store.getActions()).toContainEqual(
    push('/videos?q=meaning%20of%20life'),
  );
});
