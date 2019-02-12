import { RouterActionType } from 'connected-react-router';
import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { RouterState, SearchState } from '../../../types/State';
import withNewsNavigation, { NewsNavigationProps } from './withNewsNavigation';

const mockStore = configureStore<RouterState & SearchState>();

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
  search: {
    loading: false,
    query: 'string',
    videos: null,
    paging: null,
  },
});

beforeEach(() => {
  store.clearActions();
});

const nestedComponent = <div />;
const WithNewsNavigationComponent = withNewsNavigation(() => nestedComponent);
const wrapper = shallow(<WithNewsNavigationComponent />, {
  context: {
    store,
  },
});

test('goToNews() dispatches search with search mode set to news', () => {
  (wrapper.dive().props() as NewsNavigationProps).goToNewsResults();

  const actions = store.getActions();
  expect(actions.length).toEqual(1);
  expect(actions[0].payload.args[0]).toContain('news');
});

test('goToSearch() dispatches search with search mode set to blank', () => {
  (wrapper.dive().props() as NewsNavigationProps).goToSearchResults();

  const actions = store.getActions();
  expect(actions.length).toEqual(1);
  expect(actions[0].payload.args[0]).not.toContain('news');
});
