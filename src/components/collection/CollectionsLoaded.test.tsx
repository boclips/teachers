import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import {
  CollectionsFactory,
  MockStoreFactory,
} from '../../../test-support/factories';
import CollectionsLoaded from './CollectionsLoaded';

it('renders loading component when loading is true', () => {
  const store = MockStoreFactory.sample({
    collections: CollectionsFactory.sample({ loading: true }),
  });

  const wrapper = mount(
    <Provider store={store}>
      <CollectionsLoaded showWhileLoading={<div>HELLO</div>}>
        not rendered
      </CollectionsLoaded>
    </Provider>,
  );

  expect(wrapper.find('div').text()).toEqual('HELLO');
});

it('renders loading component when loading is true', () => {
  const store = MockStoreFactory.sample({
    collections: CollectionsFactory.sample({ loading: false }),
  });

  const wrapper = mount(
    <Provider store={store}>
      <CollectionsLoaded showWhileLoading={'not rendered'}>
        <div>HELLO</div>
      </CollectionsLoaded>
    </Provider>,
  );

  expect(wrapper.find('div').text()).toEqual('HELLO');
});
