import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStore } from 'redux-mock-store';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../test-support/factories';
import { bulkUpdateSearchParamsAction } from '../searchResults/redux/actions/UpdateSearchParametersActions';
import SearchBar from './SearchBar';
import StatefulSearchBar from './StatefulSearchBar';

let store: MockStore;

let statefulSearchBar: ReactWrapper<any>;

beforeEach(() => {
  store = MockStoreFactory.sample({
    router: {
      ...RouterFactory.sample(),
      location: {
        pathname: '',
        search: '?q=eggs',
        hash: '',
        state: null,
      },
    },
  });

  const wrapper = mount(
    <Provider store={store}>
      <SearchBar />
    </Provider>,
  );

  statefulSearchBar = wrapper.find(StatefulSearchBar);
});

test('Extracts query string from the path', () => {
  expect(statefulSearchBar).toHaveProp('value', 'eggs');
});

test('dispatches a navigation action when query submitted callback invoked', () => {
  const query = 'the meaning of life';
  statefulSearchBar.prop('onSubmit')(query);

  expect(store.getActions()).toContainEqual(
    bulkUpdateSearchParamsAction([
      { page: 1 },
      { q: 'the meaning of life' },
      { mode: undefined },
    ]),
  );
});
