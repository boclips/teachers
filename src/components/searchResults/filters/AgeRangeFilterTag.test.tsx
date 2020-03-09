import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { AgeRange } from 'src/types/AgeRange';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../test-support/factories';
import { ClosableTag } from '../../common/tags/Tag';
import { updateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';
import AgeRangeFilterTag from './AgeRangeFilterTag';

const getWrapper = (
  ageRangeMin?: number,
  ageRangeMax?: number,
  store?: Store,
) =>
  mount(
    <Provider store={store || MockStoreFactory.sample()}>
      <AgeRangeFilterTag
        ageRangeMin={ageRangeMin}
        ageRangeMax={ageRangeMax}
        ageRange={[new AgeRange(ageRangeMin, ageRangeMax)]}
      />
    </Provider>,
  );

it('renders age range with normal range', () => {
  const wrapper = getWrapper(5, 11);
  expect(wrapper.find(ClosableTag).props().value).toEqual('5-11');
});

it('renders age range with no max', () => {
  const wrapper = getWrapper(5, null);
  expect(wrapper.find(ClosableTag).props().value).toEqual('5+');
});

it('renders age range with no min', () => {
  const wrapper = getWrapper(null, 7);
  expect(wrapper.find(ClosableTag).props().value).toEqual('3-7');
});

it('does not render anything if no age range', () => {
  const wrapper = getWrapper(null, null);
  expect(wrapper).toBeEmptyRender();
});

it('removes age range min from url on close', () => {
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: '?hi&age_range_min=5',
        hash: '',
        state: null,
      },
    }),
  });

  const wrapper = getWrapper(5, null, store);

  wrapper
    .find(ClosableTag)
    .props()
    .onClose();

  expect(store.getActions().length).toEqual(1);
  expect(store.getActions()).toContainEqual(
    updateSearchParamsAction({
      age_range: [],
      age_range_min: undefined,
      age_range_max: undefined,
    }),
  );
});
