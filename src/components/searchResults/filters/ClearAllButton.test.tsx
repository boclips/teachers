import { Button } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../test-support/factories';
import { clearSearchFilterParametersAction } from '../redux/actions/clearSearchFilterParametersAction';
import ClearAllButton from './ClearAllButton';

it('clears all filters when pressed', () => {
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: '?q=123&duration_max=123',
        hash: '',
        state: null,
      },
    }),
  });

  const wrapper = mount(
    <Provider store={store}>
      <ClearAllButton />
    </Provider>,
  );

  wrapper.find(Button).simulate('click');

  expect(store.getActions().length).toEqual(1);
  expect(store.getActions()).toContainEqual(
    clearSearchFilterParametersAction(),
  );
});
