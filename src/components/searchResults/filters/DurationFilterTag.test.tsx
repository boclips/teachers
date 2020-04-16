import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { DurationRange } from 'src/types/DurationRange';
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
      <DurationFilterTag range={new DurationRange({ min, max })} />
    </Provider>,
  );

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
        search: '?hi&duration=1-2&duration=2-3',
        hash: '',
        state: null,
      },
    }),
  });

  const wrapper = getWrapper(1, 2, store);

  wrapper.find(ClosableTag).props().onClose();

  expect(store.getActions().length).toEqual(1);
  expect(store.getActions()[0].type).toEqual(updateSearchParamsAction.type);
  expect(store.getActions()[0].payload.duration[0].toString()).toEqual('2-3');
});
