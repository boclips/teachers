import {mount} from 'enzyme';
import * as React from 'react';
import {Provider} from 'react-redux';

import configureStore from 'redux-mock-store';
import {search} from '../test-support/enzymeHelpers';
import SearchView, {searchVideosAction} from './SearchView';

const mockStore = configureStore();

test('dispatches an action with search query when search button clicked', () => {
  const store = mockStore({});
  const wrapper = mount(<Provider store={store}><SearchView/></Provider>);

  search(wrapper, 'china firewall');

  expect(store.getActions()).toContainEqual(searchVideosAction('china firewall'));
});
