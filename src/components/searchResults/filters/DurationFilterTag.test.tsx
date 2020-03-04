import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../test-support/factories';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';
import DurationFilterTag from './DurationFilterTag';

const getWrapper = (min?: number, max?: number, store?: Store) =>
  mount(
    <Provider store={store || MockStoreFactory.sample()}>
      <DurationFilterTag range={{ min, max }} />
    </Provider>,
  );

it('does not render anything if no duration filter', () => {
  const wrapper = getWrapper();
  expect(wrapper).toBeEmptyRender();
});

it('renders duration range with normal range', () => {
  const wrapper = getWrapper(120, 300);
  expect(wrapper.find(ClosableTag).props().value).toEqual('2m - 5m');
});

it.skip('renders duration with no max', () => {
  const wrapper = getWrapper(1200);
  expect(wrapper.find(ClosableTag).props().value).toEqual('20m +');
});

it('renders duration with no min', () => {
  const wrapper = getWrapper(null, 120);
  expect(wrapper.find(ClosableTag).props().value).toEqual('0m - 2m');
});

it('removes duration from url on close', () => {
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: '?hi&duration=123',
        hash: '',
        state: null,
      },
    }),
  });

  const wrapper = getWrapper(123, null, store);

  wrapper
    .find(ClosableTag)
    .props()
    .onClose();

  expect(store.getActions().length).toEqual(1);
  expect(store.getActions()).toContainEqual(
    updateSearchParamsAction({ duration: undefined }),
  );
});
