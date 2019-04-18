import { shallow } from 'enzyme';
import React from 'react';
import {
  MockStoreFactory,
  RouterFactory,
  SearchFactory,
} from '../../../../test-support/factories';
import withNewsNavigation, { NewsNavigationProps } from './withNewsNavigation';

const store = MockStoreFactory.sample({
  router: {
    ...RouterFactory.sample(),
    location: {
      pathname: '',
      search: '?q=eggs',
      hash: '',
      state: null,
    },
  },
  search: {
    ...SearchFactory.sample(),
    query: 'string',
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
