import { shallow } from 'enzyme';
import React from 'react';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../test-support/factories';
import { ClosableTag } from '../../video/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/UpdateSearchParametersActions';
import DurationFilterTag from './DurationFilterTag';

const getWrapper = (minDuration?: number, maxDuration?: number) => {
  const store = MockStoreFactory.sample();

  return shallow(
    <DurationFilterTag minDuration={minDuration} maxDuration={maxDuration} />,
    { context: { store } },
  ).dive();
};

it('does not render anything if no duration filter', () => {
  const wrapper = getWrapper();
  expect(wrapper).toBeEmptyRender();
});

it('renders duration range with normal range', () => {
  const wrapper = getWrapper(60, 180);
  expect(wrapper.find(ClosableTag).props().value).toEqual('1m-3m');
});

it('renders duration with no max', () => {
  const wrapper = getWrapper(180);
  expect(wrapper.find(ClosableTag).props().value).toEqual('3m+');
});

it('renders duration with no min', () => {
  const wrapper = getWrapper(null, 180);
  expect(wrapper.find(ClosableTag).props().value).toEqual('0m-3m');
});

it('removes duration from url on close', () => {
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: '?hi&min_duration=123',
        hash: '',
        state: null,
      },
    }),
  });

  const wrapper = shallow(<DurationFilterTag minDuration={123} />, {
    context: { store },
  }).dive();

  wrapper
    .find(ClosableTag)
    .props()
    .onClose();

  expect(store.getActions().length).toEqual(1);
  expect(store.getActions()).toContainEqual(
    updateSearchParamsAction({
      min_duration: undefined,
      max_duration: undefined,
    }),
  );
});
